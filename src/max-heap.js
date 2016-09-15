	//constructor() {
	//	this.root = null;
	//	this.parentNodes = [];
	//}

	//push(data, priority) {
	//	this.insertNode(new Node(data, priority));
	//	this.shiftNodeUp(new Node(data, priority));
	//}

	//clear() {
	//	this.root = null;
	//	this.parentNodes = [];
	//}
	const Node = require('./node');

	class MaxHeap {
		constructor() {
			this.root = null;
			this.count = 0;
			this.parentNodes = [];
		}

		push(data, priority) {
			var node = new Node(data, priority);
			this.insertNode(node);
			this.shiftNodeUp(node);
		}

		pop() {
			if (this.isEmpty()) {
				return;
			}
			var currentRoot = this.detachRoot();
			this.restoreRootFromLastInsertedNode(currentRoot);
			this.shiftNodeDown(this.root);
			return currentRoot.data;
		}

		detachRoot() {
			var currentRoot = this.root;

			if (!currentRoot) {
				return;
			}

			this.root = null;
			this.count--;

			if (this.parentNodes.indexOf(currentRoot) >= 0) {
				this.parentNodes.shift();
			}
			return currentRoot;
		}

		restoreRootFromLastInsertedNode(detached) {
			if (this.parentNodes.length == 0) {
				return;
			}

			var oldLeft = detached.left;
			var oldRight = detached.right;
			var newRoot = this.parentNodes[this.parentNodes.length - 1];
			var newRootParent = newRoot.parent;

			newRoot.remove();
			this.root = newRoot;

			if (this.parentNodes.length == 2) {
				newRoot.appendChild(oldLeft);
				this.parentNodes.unshift(newRoot);
				this.parentNodes.pop();

			} else {
				newRoot.appendChild(oldLeft);
				newRoot.appendChild(oldRight);
				this.parentNodes.pop();

				if (this.parentNodes.indexOf(newRootParent) == -1) {
					this.parentNodes.unshift(newRootParent);
				}
			}
		}

		size() {
			return this.count;
		}

		isEmpty() {
			return this.root == null;
		}

		clear() {
			this.root = null;
			this.count = 0;
			this.parentNodes = [];
		}

		insertNode(node) {
			this.count++;

			if (this.isEmpty()) {
				this.root = node;
			} else {
				if (this.parentNodes[0].left == null) {
					this.parentNodes[0].appendChild(node);
				} else {
					this.parentNodes[0].appendChild(node);
					this.parentNodes.shift();
				}

			}

			this.parentNodes.push(node);
		}

		shiftNodeUp(node) {
			if (node != null) {
				if (node.parent != null) {
					if (node.priority > node.parent.priority) {
						if (node.parent == this.root) {
							this.root = node;
						}

						var nodeId = this.parentNodes.indexOf(node);
						var parentId = this.parentNodes.indexOf(node.parent);

						this.parentNodes[nodeId] = node.parent;

						if (parentId >= 0) {
							this.parentNodes[parentId] = node;
						}

						node.swapWithParent();
						this.shiftNodeUp(node);
					}
				}
			}
		}

		shiftNodeDown(node) {
			if (node != null) {
				var childToChange;
				var currentRoot = this.root;
				if (node.left != null) {
					if (node.right != null) {
						childToChange = (node.right.priority >= node.left.priority) ? node.right : node.left;
					} else {
						childToChange = node.left;
					}
					if (childToChange.priority > node.priority) {
						if (node == currentRoot) {
							this.root = childToChange;
						}
						childToChange.swapWithParent();

						var nodeId = this.parentNodes.indexOf(childToChange);
						var parentId = this.parentNodes.indexOf(node);

						if (parentId >= 0) {
							this.parentNodes[parentId] = childToChange;
						}

						this.parentNodes[nodeId] = node;

						this.shiftNodeDown(node);
					}
				}
			}
		}
	}

	module.exports = MaxHeap;
