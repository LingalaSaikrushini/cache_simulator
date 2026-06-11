# LRU Cache Simulator

A browser-based interactive simulator for visualizing how a Least Recently Used (LRU) cache works.

## What it does

- Set a custom cache capacity
- Insert key-value pairs using PUT
- Retrieve values using GET
- Tracks cache hits and misses in real time
- Visualizes the cache order from most recent to least recent

## How to use

1. Open `lrucache.html` in a browser
2. Enter a cache size and click "Set Capacity"
3. Enter a key and value, then click PUT to insert
4. Enter a key and click GET to retrieve — the cache order updates automatically
5. Watch hits/misses update as you interact

## How it works

The cache is implemented with a doubly linked list + hash map for O(1) get and put operations. The most recently accessed item moves to the front; when capacity is exceeded, the least recently used item is evicted from the back.

## Files

- `lrucache.html` — UI layout
- `lrucache.js` — LRU cache logic and DOM interactions
- `lrucache.css` — Styling
