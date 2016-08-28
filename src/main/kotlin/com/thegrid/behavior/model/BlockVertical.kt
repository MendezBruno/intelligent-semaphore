package com.thegrid.behavior.model

class BlockVertical(id: String, street: Street, length: Int, entryNode: NodeType, egressNode: NodeType)
: Block(id, street, length, entryNode, egressNode) {

    override fun setAsEgressBlock(node: NodeType) {
        node.setVerticalEgressBlock(this);
    }

    override fun setAsEntryBlock(node: NodeType) {
        node.setVerticalEntryBlock(this);
    }
}
