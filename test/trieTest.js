/**
 * Created by csbacon on 6/17/2016.
 */

"use strict";

var chai = require("chai");

var should = chai.should();
var expect = chai.expect;

describe("trie tests", function() {
    var trie;

    beforeEach(function() {
        trie = require("../trie.js")();
    });

    describe("contains", function() {
        var testWord;

        beforeEach(function() {
            testWord = "";
        });
        
        it("should be false if trie is empty", function() {
            testWord = "shouldFail";
            expect(trie.contains(testWord)).to.be.false;
        });

        it("should be true if trie contains the word", function() {
            testWord = "shouldFail";
            trie.addWord(testWord);
            expect(trie.contains(testWord)).to.be.true;
        });

        it("should work for strings of length 1", function() {
            testWord = "abmyz";
            var i;
            for (i = 0; i < testWord.length; i++) {
                trie.addWord(testWord[i]);
            }
            for (i = 0; i < testWord.length; i++) {
                expect(trie.contains(testWord[i])).to.be.true;
            }
        });

        it("should work for strings of length 100", function() {
            var alpha = "abcdefghijklmnopqrstuvwxyz".split("");
            var testWordRepeatedLetter = "";
            var testWordRandomLetters = "";
            var randomIndex;
            var i;

            randomIndex = Math.floor(Math.random() * 26);

            for (i = 0; i < 100; i++) {
                testWordRepeatedLetter += alpha[randomIndex];
            }

            for (i = 0; i < 100; i++) {
                randomIndex = Math.floor(Math.random() * 26);
                testWordRandomLetters += alpha[randomIndex];
            }

            trie.addWord(testWordRepeatedLetter);
            trie.addWord(testWordRandomLetters);

            expect(trie.contains(testWordRepeatedLetter)).to.be.true;
            expect(trie.contains(testWordRandomLetters)).to.be.true;
        });

        it("should work for strings that are similar", function() {
            testWord = "bar";
            var similarToTestWord = "bare";

            trie.addWord(testWord);
            trie.addWord(similarToTestWord);

            expect(trie.contains(testWord)).to.be.true;
            expect(trie.contains(similarToTestWord)).to.be.true;
        });

        it("should reject strings that are similar to contained strings", function() {
            testWord = "bar";
            var similarToTestWordButShorter = "ba";
            var similarToTestWordButLonger = "bare";

            trie.addWord(testWord);
            trie.addWord(similarToTestWordButShorter);
            trie.addWord(similarToTestWordButLonger);

            expect(trie.contains(testWord)).to.be.true;
            expect(trie.contains(similarToTestWordButShorter)).to.be.true;
            expect(trie.contains(similarToTestWordButLonger)).to.be.true;
        });

        it("should reject non-string queries", function() {
            testWord = "control"
            trie.addWord(testWord);
            expect(trie.contains(testWord)).to.be.true;

            testWord = 1;
            expect(trie.contains(testWord)).to.be.false;

            testWord = { word: "word" };
            expect(trie.contains(testWord)).to.be.false;

            testWord = null;
            expect(trie.contains(testWord)).to.be.false;

            testWord = NaN;
            expect(trie.contains(testWord)).to.be.false;

            testWord = undefined;
            expect(trie.contains(testWord)).to.be.false;

            testWord = function notAWordFunction() {
                return "notAWord";
            }
            expect(trie.contains(testWord)).to.be.false;
        });

        it("should reject strings that contain non-alpha characters", function() {
            testWord = "control";
            trie.addWord(testWord);

            testWord = "1";
            expect(trie.contains(testWord)).to.be.false;

            testWord = "-";
            expect(trie.contains(testWord)).to.be.false;

            testWord = "&";
            expect(trie.contains(testWord)).to.be.false;

            testWord = "apple1";
            expect(trie.contains(testWord)).to.be.false;

            testWord = "1apple";
            expect(trie.contains(testWord)).to.be.false;

            testWord = "hello world";
            expect(trie.contains(testWord)).to.be.false;

            testWord = "hello-world";
            expect(trie.contains(testWord)).to.be.false;

            testWord = "hellow1world";
            expect(trie.contains(testWord)).to.be.false;

            testWord = "hello_world";
            expect(trie.contains(testWord)).to.be.false;
        });

        it("should be case-insensitive", function() {
            testWord = "BANANA";
            trie.addWord(testWord);
            expect(trie.contains(testWord.toLowerCase())).to.be.true;
        });

        it("should reject the empty string", function() {
            testWord = "";
            expect(trie.contains(testWord)).to.be.false;
        });
    });

    describe("addWord", function() {
        var testWord;

        beforeEach(function() {
            testWord = "";
        });

        it("should be able to add a word to an empty trie", function() {
            testWord = "test";
            expect(trie.addWord(testWord)).to.be.true;
            expect(trie.contains(testWord)).to.be.true;
            trie.getSize().should.equal(1);
        });

        it("should be able to add multiple words to an empty trie", function() {
            var testWord1, testWord2;
            testWord = "test";
            testWord1 = "apple";
            testWord2 = "orange";

            expect(trie.addWord(testWord)).to.be.true;
            expect(trie.addWord(testWord1)).to.be.true;
            expect(trie.addWord(testWord2)).to.be.true;
            expect(trie.contains(testWord)).to.be.true;
            expect(trie.contains(testWord1)).to.be.true;
            expect(trie.contains(testWord2)).to.be.true;
            trie.getSize().should.equal(3);
        });

        it("should be able to add words that are substrings of already existing words", function() {
            var substring1, substring2;
            testWord = "test";
            substring1 = "tes";
            substring2 = "te";

            expect(trie.addWord(testWord)).to.be.true;
            expect(trie.addWord(substring1)).to.be.true;
            expect(trie.addWord(substring2)).to.be.true;
            expect(trie.contains(testWord)).to.be.true;
            expect(trie.contains(substring1)).to.be.true;
            expect(trie.contains(substring2)).to.be.true;
            trie.getSize().should.equal(3);
        });

        it("should be able to add words that are superstrings of existing words", function() {
            var superString1, superString2;
            testWord = "test";
            superString1 = "testi";
            superString2 = "testin";

            expect(trie.addWord(testWord)).to.be.true;
            expect(trie.addWord(superString1)).to.be.true;
            expect(trie.addWord(superString2)).to.be.true;
            expect(trie.contains(testWord)).to.be.true;
            expect(trie.contains(superString1)).to.be.true;
            expect(trie.contains(superString2)).to.be.true;
            trie.getSize().should.equal(3);
        });

        it("should be able to add words that are 1 character long", function() {
            testWord = "t";

            expect(trie.addWord(testWord)).to.be.true;
            expect(trie.contains(testWord)).to.be.true;
            trie.getSize().should.equal(1);
        });

        it("should be able to add words that are 100 letters long", function() {
            var alpha = "abcdefghijklmnopqrstuvwxyz".split("");
            var testWordRepeatedLetter = "";
            var testWordRandomLetters = "";
            var randomIndex;
            var i;

            randomIndex = Math.floor(Math.random() * 26);

            for (i = 0; i < 100; i++) {
                testWordRepeatedLetter += alpha[randomIndex];
            }

            for (i = 0; i < 100; i++) {
                randomIndex = Math.floor(Math.random() * 26);
                testWordRandomLetters += alpha[randomIndex];
            }

            expect(trie.addWord(testWordRepeatedLetter)).to.be.true;
            expect(trie.addWord(testWordRandomLetters)).to.be.true;
            expect(trie.contains(testWordRepeatedLetter)).to.be.true;
            expect(trie.contains(testWordRandomLetters)).to.be.true;
            trie.getSize().should.equal(2);
        });

        it("should not be able to add already existing words", function() {
            testWord = "test";

            expect(trie.addWord(testWord)).to.be.true;
            trie.getSize().should.equal(1);
            expect(trie.addWord(testWord)).to.be.false;
            trie.getSize().should.equal(1);
        });

        it("should not be able to add words that are not strings", function() {
            testWord = 1;
            expect(trie.addWord(testWord)).to.be.false;
            expect(trie.contains(testWord)).to.be.false;
            trie.getSize().should.equal(0);

            testWord = { word: "word" };
            expect(trie.addWord(testWord)).to.be.false;
            expect(trie.contains(testWord)).to.be.false;
            trie.getSize().should.equal(0);

            testWord = null;
            expect(trie.addWord(testWord)).to.be.false;
            expect(trie.contains(testWord)).to.be.false;
            trie.getSize().should.equal(0);

            testWord = NaN;
            expect(trie.addWord(testWord)).to.be.false;
            expect(trie.contains(testWord)).to.be.false;
            trie.getSize().should.equal(0);

            testWord = undefined;
            expect(trie.addWord(testWord)).to.be.false;
            expect(trie.contains(testWord)).to.be.false;
            trie.getSize().should.equal(0);

            testWord = function notAWordFunction() {
                return "notAWord";
            }
            expect(trie.addWord(testWord)).to.be.false;
            expect(trie.contains(testWord)).to.be.false;
            trie.getSize().should.equal(0);
        });

        it("should not be able to add words that contain non-alpha characters", function() {
            testWord = "1";
            expect(trie.addWord(testWord)).to.be.false;
            expect(trie.contains(testWord)).to.be.false;
            trie.getSize().should.equal(0);

            testWord = "-";
            expect(trie.addWord(testWord)).to.be.false;
            expect(trie.contains(testWord)).to.be.false;
            trie.getSize().should.equal(0);

            testWord = "&";
            expect(trie.addWord(testWord)).to.be.false;
            expect(trie.contains(testWord)).to.be.false;
            trie.getSize().should.equal(0);

            testWord = "apple1";
            expect(trie.addWord(testWord)).to.be.false;
            expect(trie.contains(testWord)).to.be.false;
            trie.getSize().should.equal(0);

            testWord = "1apple";
            expect(trie.addWord(testWord)).to.be.false;
            expect(trie.contains(testWord)).to.be.false;
            trie.getSize().should.equal(0);

            testWord = "hello world";
            expect(trie.addWord(testWord)).to.be.false;
            expect(trie.contains(testWord)).to.be.false;
            trie.getSize().should.equal(0);

            testWord = "hello-world";
            expect(trie.addWord(testWord)).to.be.false;
            expect(trie.contains(testWord)).to.be.false;
            trie.getSize().should.equal(0);

            testWord = "hellow1world";
            expect(trie.addWord(testWord)).to.be.false;
            expect(trie.contains(testWord)).to.be.false;
            trie.getSize().should.equal(0);

            testWord = "hello_world";
            expect(trie.addWord(testWord)).to.be.false;
            expect(trie.contains(testWord)).to.be.false;
            trie.getSize().should.equal(0);
        });

        it("should not be able to add the empty string", function() {
            testWord = "";
            expect(trie.addWord(testWord)).to.be.false;
            expect(trie.contains(testWord)).to.be.false;
            trie.getSize().should.equal(0);
        });

        it("should be able to add 17576 words", function() {
            var alpha = "abcdefghijklmnopqrstuvwxyz".split("");
            var i, j, k;

            for (i = 0; i < alpha.length; i++) {
                for (j = 0; j < alpha.length; j++) {
                    for (k = 0; k < alpha.length; k++) {
                        testWord = alpha[i] + alpha[j] + alpha[k];
                        expect(trie.addWord(testWord)).to.be.true;
                    }
                }
            }

            for (i = 0; i < alpha.length; i++) {
                for (j = 0; j < alpha.length; j++) {
                    for (k = 0; k < alpha.length; k++) {
                        testWord = alpha[i] + alpha[j] + alpha[k];
                        expect(trie.contains(testWord)).to.be.true;
                    }
                }
            }
            trie.getSize().should.equal(17576);
        });
    });

    describe("deleteWord", function() {
        var testWord;

        beforeEach(function() {
            testWord = "";
        });

        it("should fail when trie is empty", function() {
            testWord = "test";
            expect(trie.deleteWord(testWord)).to.be.false;
            trie.getSize().should.equal(0);
        });

        it("should be able to delete the only word in a trie", function() {
            testWord = "test";
            trie.addWord(testWord);

            expect(trie.deleteWord(testWord)).to.be.true;
            trie.getSize().should.equal(0);
        });

        it("should be able to delete a word from a populated trie without affecting the other words", function() {
            var testWords = ["t", "apple", "orange", "tes", "testing"];
            testWord = "test";

            var i;
            for (i = 0; i < testWords.length; i++) {
                trie.addWord(testWords[i]);
            }
            trie.addWord(testWord);

            expect(trie.deleteWord(testWord)).to.be.true;
            trie.getSize().should.equal(testWords.length);
            for (i = 0; i < testWords.length; i++) {
                expect(trie.contains(testWords[i])).to.be.true;
            }
        });

        it("should be able to delete all the words from a trie", function() {
            var testWords = ["t", "apple", "orange", "tes", "testing"];

            var i;
            for (i = 0; i < testWords.length; i++) {
                trie.addWord(testWords[i]);
            }

            for (i = 0; i < testWords.length; i++) {
                expect(trie.deleteWord(testWords[i])).to.be.true;
                expect(trie.contains(testWords[i])).to.be.false;
                trie.getSize().should.equal(testWords.length - i - 1);
            }
        });

        it("should be able to re-add a word once it is deleted", function() {
            testWord = "test";
            trie.addWord(testWord);

            expect(trie.deleteWord(testWord)).to.be.true;
            expect(trie.contains(testWord)).to.be.false;
            trie.getSize().should.equal(0);

            expect(trie.addWord(testWord)).to.be.true;
            expect(trie.contains(testWord)).to.be.true;
            trie.getSize().should.equal(1);
        });

        it("should fail when the given word is not a string", function() {
            testWord = "control";
            trie.addWord(testWord);

            testWord = 1;
            expect(trie.deleteWord(testWord)).to.be.false;

            testWord = { word: "word" };
            expect(trie.deleteWord(testWord)).to.be.false;

            testWord = null;
            expect(trie.deleteWord(testWord)).to.be.false;

            testWord = NaN;
            expect(trie.deleteWord(testWord)).to.be.false;

            testWord = undefined;
            expect(trie.deleteWord(testWord)).to.be.false;

            testWord = function notAWordFunction() {
                return "notAWord";
            }
            expect(trie.deleteWord(testWord)).to.be.false;
        });

        it("should fail when the given word contains non-letter characters", function() {
            testWord = "control";
            trie.addWord(testWord);

            testWord = "1";
            expect(trie.deleteWord(testWord)).to.be.false;

            testWord = "-";
            expect(trie.deleteWord(testWord)).to.be.false;

            testWord = "&";
            expect(trie.deleteWord(testWord)).to.be.false;

            testWord = "apple1";
            expect(trie.deleteWord(testWord)).to.be.false;

            testWord = "1apple";
            expect(trie.deleteWord(testWord)).to.be.false;

            testWord = "hello world";
            expect(trie.deleteWord(testWord)).to.be.false;

            testWord = "hello-world";
            expect(trie.deleteWord(testWord)).to.be.false;

            testWord = "hellow1world";
            expect(trie.deleteWord(testWord)).to.be.false;

            testWord = "hello_world";
            expect(trie.deleteWord(testWord)).to.be.false;
        });

        it("should fail when the given word is the empty string", function() {
            testWord = "control";
            trie.addWord(testWord);

            testWord = "";
            expect(trie.deleteWord(testWord)).to.be.false;
        });
    });
});