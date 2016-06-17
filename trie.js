/**
 * Created by csbacon on 6/17/2016.
 */

"use strict";

var alphabetArray = "abcdefghijklmnopqrstuvwxyz".split("");

var trie = function Trie(initialDictionary) {
    function Node() {
        this.children = createAlphabetMap();
        this.isWord = false;
    }

    var size = 0;
    var root = null;

    return {
        addWord: addWord,
        deleteWord: deleteWord,
        contains: contains,
        getSize: getSize
    };

    /* Public Functions */
    function addWord(word) {
        if (!contains(word) && isValid(word)) {
            word = word.toLowerCase();

            if (size === 0) {
                root = new Node();
            }
            var currentNode = root;

            var i;
            for (i = 0; i < word.length; i++) {
                if (currentNode.children[word[i]] == null) {
                    currentNode.children[word[i]] = new Node();
                }

                currentNode = currentNode.children[word[i]];
            }
            currentNode.isWord = true;

            size += 1;
            return true;
        } else {
            return false;
        }
    }

    function deleteWord(word) {
        if (size === 0 || !isValid(word)) {
            return false;
        } else {
            word = word.toLowerCase();
        }
    }

    function contains(word) {
        if (size === 0 || !isValid(word)) {
            return false;
        } else {
            word = word.toLowerCase();
            var currentNode = root;
            var i;
            for (i = 0; i < word.length; i++) {
                if (currentNode.children[word[i]] == null) {
                    return false;
                } else {
                    currentNode = currentNode.children[word[i]];
                }
            }

            return currentNode.isWord;
        }
    }

    function getSize() {
        return size;
    }

    /* Private Functions */

    function isValid(word) {
        if (typeof word !== "string" || word.length === 0) {
            return false;
        } else {
            return /^[a-zA-Z]+$/.test(word);
        }
    }
};

function createAlphabetMap() {
    var alphabetMap = {};

    var i;
    for (i = 0; i < alphabetArray.length; i++) {
        alphabetMap[alphabetArray[i]] = null;
    }

    return alphabetMap;
}

module.exports = trie;
