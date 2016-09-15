//class Node {
//	constructor(data, priority) {
//		this.data = data;
//		this.priority = priority;
//		this.parent = null;
//		this.left = null;
//		this.right = null;
//	}
//
//	appendChild(node) {
//		if (this.left == null) {
//			this.left = node;
//			node.parent = this;
//		} else if (this.right == null ) {
//			this.right = node;
//			node.parent = this;
//		}
//	}
//
//	removeChild(node) {
//		if (node === this.left) {
//			this.left = null;
//			node.parent = null;
//		} else if (node === this.right) {
//			this.right = null;
//			node.parent = null;
//		} else {
//			throw "Not a child";
//		}
//	}
//
//	remove() {
//		if (this.parent !== null) {
//			this.parent.removeChild(this);
//		}
//	}
//
//	swapWithParent() {
//		if (this.parent === null) {
//			return;
//		}
//
//		this.appendChild(this.parent);
//	}
//}
//
//module.exports = Node;
class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;

		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!node) {
			return;
		}

		if (!this.left) {
			this.left = node;
			node.parent = this;
		} else if (!this.right) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if (this.left == node) {
			this.left = null;
			node.parent = null;
		} else if (this.right == node) {
			this.right = null;
			node.parent = null;
		} else {
			throw 'Not a child';
		}
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		var parent = this.parent;

		if (!parent) {
			return;
		}

		var left = this.left;
		var right = this.right;
		var topLeft = parent.left;
		var topRight = parent.right;
		var topParent = parent.parent;

		if (topParent) {
			if (topParent.left == parent) {
				topParent.left = this;
			} else {
				topParent.right = this;
			}
		}

		parent.parent = this;
		this.parent = topParent;

		if (left) {
			left.parent = parent;
		}

		if (right) {
			right.parent = parent
		}

		parent.left = left;
		parent.right = right;

		if (topLeft == this) {
			this.left = parent;
			this.right = topRight;

			if (topRight) {
				topRight.parent = this;
			}
		} else {
			this.right = parent;
			this.left = topLeft;

			if (topLeft) {
				topLeft.parent = this;
			}
		}
	}
}

module.exports = Node;
