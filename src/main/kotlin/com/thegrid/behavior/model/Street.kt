package com.thegrid.behavior.model

data class Street(
        /*val maxSpeed: Double, */
        val lanes: Int,
        val orientation: Orientation,
        val blocks: MutableList<Block>,
        val popularity: Int,
        val id: Int = Street.getNextId()){

    fun addBlock(block: Block){
        blocks.add(block)
    }

    override fun hashCode(): Int {
        return id.hashCode();
    }

    companion object {
        private var _nextId = 0;
        public fun getNextId() : Int {
          var id = _nextId;
            _nextId++;
            return id;
        }
    }
}