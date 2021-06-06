// Load dependencies
const { accounts, contract } = require('@openzeppelin/test-environment');
const { expectEvent, expectRevert, BN } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

// Load compiled artifacts
const Box = contract.fromArtifact('Box');

// Start test block
describe('Box', function() {

    const [ owner, other ] = accounts;

    const value = new BN('42');

    beforeEach(async function() {
        // Deploy a new Box contract for each test
        this.contract = await Box.new({ from: owner });
    });

    it('retrieve returns a value previously stored', async function() {
        await this.contract.store(value, { from: owner });

        expect((await this.contract.retrieve()).toString()).to.equal('42');
    });

    it('store emits an event', async function() {
        const receipt = await this.contract.store(value, { from: owner });
        expectEvent(receipt, 'ValueChanged', { newValue: value });
    });

    it('non owner cannot store a value', async function() {
        // Test a transaction reverts
        await expectRevert(
            this.contract.store(value, { from: other }),
            'Ownable: caller is not the owner'
        );
    });

});