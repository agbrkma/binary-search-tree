class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null
    }
}

class Tree {
    constructor(array) {
        array = [...new Set(array)].sort((a,b) => a-b);
        this.root = this.buildTree(array)
    }

    buildTree(array){
        if (array.length === 0){
            return null
        }
        const mid = Math.floor(array.length / 2);
        const root = new Node(array[mid]);
        root.left = this.buildTree(array.slice(0, mid));
        root.right = this.buildTree(array.slice(mid + 1));
        return root;
    }

    insert(value, root = this.root) {
        if(root === null){
            return new Node(value)
        }
        if(value < root.data){
            root.left = this.insert(value, root.left);
        } else if(value > root.data) {
            root.right = this.insert(value, root.right)
        }
        return root;
    }

    deleteItem(value, root = this.root) {
        if(root === null){
            return root;
        }

        if(value < root.data){
            root.left = this.deleteItem(value, root.left);
        } else if(value > root.data){
            root.right = this.deleteItem(value, root.right);
        }else {
            if(root.left === null){
                return root.right;
            } else if(root.right === null){
                return root.left
            }
            root.data = this.minValue(root.right)
            root.right = this.deleteItem(root.data, root.right);
        }
        return root;
    }

    minValue(root){
        let minv = root.data;
        while(root.left !== null){
            minv = root.left.data;
            root = root.left;
        }
        return minv;
    }

    find(value, root = this.root) {
        if(root === null || root.data === value){
            return root;
        }
        if(value < root.data) {
            return this.find(value, root.left)
        }
        return this.find(value, root.right)
    }

    levelOrder(callback) {
        const result = [];
        const queue = [this.root];
        while(queue.length){
            const node = queue.shift();
            if(callback){
                callback(node);
            } else {
                result.push(node.data)
            }
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right)
        }
    return result;
    }

    inOrder(callback, node = this.root, result = []){
        if(node === null){
            return;
        }
        this.inOrder(callback, node.left, result);
        if(callback){
            callback(node)
        }else {
            result.push(node.data)
        }
        this.inOrder(callback, node.right, result)
        return result;
    }

    preOrder(callback, node = this.root, result = []) {
        if(node === null){
            return;
        }
        if(callback){
            callback(node);
        } else{
            result.push(node.data)
        }
        this.preOrder(callback, node.left, result);
        this.preOrder(callback, node.right, result);
        return result;
    }

    postOrder(callback, node = this.root, result = []){
        if(node === null){
            return
        }
        this.postOrder(callback, node.left, result)
        this.postOrder(callback, node.right, result)
        if(callback){
            callback(node)
        } else {
            result.push(node.data)
        }
        return result;
    }

    height(node){
        if(node === null){
            return -1
        }
        const leftHeight = this.height(node.left)
        const rightHeight = this.height(node.right)
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node, current = this.root, level = 0) {
        if(current === null){
            return -1
        }
        if(current === node){
            return level;
        }
        const leftDepth = this.depth(node, current.left, level + 1)
        if(leftDepth !== -1){
            return leftDepth
        }
        return this.depth(node, current.right, level + 1);
    }

    isBalanced(node = this.root) {
        if(node === null) return true;
        const leftHeight = this.height(node.left)
        const rightHeight = this.height(node.right)
        const heightDiff = Math.abs(leftHeight - rightHeight);
        if(heightDiff > 1) return false;
        return this.isBalanced(node.left) && this.isBalanced(node.right)
    }

    rebalance(){
        const values = this.inOrder();
        this.root = this.buildTree(values)
    }

}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if(node === null) return;
    if(node.right !== null){
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
}

const getRandomArray = (length, max) =>
  Array.from({ length }, () => Math.floor(Math.random() * max));
const array = getRandomArray(15, 100);
const tree = new Tree(array);

console.log("Tree is balanced:", tree.isBalanced());
console.log("Level order:", tree.levelOrder());
console.log("Pre order:", tree.preOrder());
console.log("Post order:", tree.postOrder());
console.log("In order:", tree.inOrder());

prettyPrint(tree.root);

tree.insert(150);
tree.insert(200);
tree.insert(250);

console.log("Tree is balanced after adding > 100 values:", tree.isBalanced());

tree.rebalance();

console.log("Tree is balanced after rebalancing:", tree.isBalanced());
console.log("Level order after rebalancing:", tree.levelOrder());
console.log("Pre order after rebalancing:", tree.preOrder());
console.log("Post order after rebalancing:", tree.postOrder());
console.log("In order after rebalancing:", tree.inOrder());

prettyPrint(tree.root);