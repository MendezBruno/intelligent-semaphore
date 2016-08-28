package com.thegrid.behavior.model

class BlockHorizontal(id: String, street: Street, length: Int, entryNode: NodeType, egressNode: NodeType)
: Block(id, street, length, entryNode, egressNode) {

    public override fun setAsEntryBlock(node: NodeType) {
        node.setHorizontalEntryBlock(this);
    }

    public override fun setAsEgressBlock(node : NodeType) {
        node.setHorizontalEgressBlock(this);
    }
}