

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();

        this.head = new Node(null, null);
        this.tail = new Node(null, null);

        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    add(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }

    remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    get(key) {
        if (!this.map.has(key)) return -1;

        const node = this.map.get(key);
        this.remove(node);
        this.add(node);
        return node.value;
    }

    put(key, value) {
        if (this.map.has(key)) {
            this.remove(this.map.get(key));
        }

        const node = new Node(key, value);
        this.add(node);
        this.map.set(key, node);

        if (this.map.size > this.capacity) {
            const lru = this.tail.prev;
            this.remove(lru);
            this.map.delete(lru.key);
        }
    }

    state() {
        const result = [];
        let curr = this.head.next;

        while (curr !== this.tail) {
            result.push({ key: curr.key, value: curr.value });
            curr = curr.next;
        }
        return result;
    }
}



let cache = null;
let hits = 0;
let misses = 0;

function renderCache(data) {
    const cacheDiv = document.getElementById("cache");
    cacheDiv.innerHTML = "";

    data.forEach(item => {
        const div = document.createElement("div");
        div.className = "cache-item";
        div.innerText = `${item.key}:${item.value}`;
        cacheDiv.appendChild(div);
    });
}

function updateStats() {
    document.getElementById("hits").innerText = hits;
    document.getElementById("misses").innerText = misses;
}

function initCache() {
    const capacity = parseInt(document.getElementById("capacity").value);

    if (!capacity || capacity <= 0) {
        alert("Please enter a valid cache size");
        return;
    }

    cache = new LRUCache(capacity);
    hits = 0;
    misses = 0;

    updateStats();
    renderCache([]);
    alert("Cache Initialized Successfully");
}

function putValue() {
    if (!cache) {
        alert("Initialize cache first");
        return;
    }

    const key = document.getElementById("putKey").value;
    const value = document.getElementById("putValue").value;

    if (key === "" || value === "") {
        alert("Enter both key and value");
        return;
    }

    cache.put(key, value);
    renderCache(cache.state());
}

function getValue() {
    if (!cache) {
        alert("Initialize cache first");
        return;
    }

    const key = document.getElementById("putKey").value;
    const result = cache.get(key);

    if (result === -1) {
        misses++;
    } else {
        hits++;
    }

    updateStats();
    renderCache(cache.state());
}
