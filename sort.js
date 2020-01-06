//1) Understanding merge sort

//List of numbers - 21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40

//What will be left over after 3 recursive calls?
//      Middle - 16
//      First call - 21, 1, 26, 45, 29, 28, 2, 9, 16
//                   49, 39, 27, 43, 34, 46, 40

//      Second call - 21, 1, 26, 45, 29
//                  - 28, 2, 9, 16
//                  - 49, 39, 27, 43
//                  - 34, 46, 40

//      Third call  - 21, 1, 26
//                  - 45, 29
//                  - 28, 2, 9
//                  - 16
//                  - 49, 39, 27
//                  - 43
//                  - 34, 46
//                  - 40

//What will be left over after 16 recursive calls?
//Every number will be its own array

//What are the first two lists to be merged?
//21 and 1 will be merged, and 26 and 45 will be merged

//Which two lists would be merged on the 7th merge?
//27 and 43

//2) Understanding quicksort
//Sorting an array in ascending order
//After first partition step, array is 3, 9, 1, 14, 17, 24, 22, 20

//Pivot could have been 17, but not 14 
//      --Untrue, both are sorted properly

//Pivot could have been either 14 or 17
//      --True, both are sorted properly

//The pivot could have been either 14 or 17

// Given the following list of numbers - 14, 17, 13, 15, 19, 10, 3, 16, 9, 12
//  -When last item is used as a pivot(12):
//      First partition - 10, 3, 9, 12, 15, 19, 14, 17, 16, 13
//      Second partition - (sorting [10, 3, 9] and [15, 19, 14, 17, 16, 13])
//                          = [3, 9, 10] and [13, 15, 19, 13, 17, 16]
//  -When first item is used as pivot(14):
//      First partition - 13, 10, 3, 9, 12, 14, 17, 16, 15, 19
//      Second partition - [10, 9, 12, 3, 13] and [16, 15, 17, 19]

//3) Implementing quicksort:

let qSort = function(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }

    const middle = partition(array, start, end); //Middle is returned as j in the partition algorithm
    array = qSort(array, start, middle);
    array = qSort(array, middle + 1, end);

    return array;
}

function partition(array, start, end) {
    const pivot = array[end - 1];

    let j = start;

    for (let i = start; i < end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array, i, j);
            j++;
        }
    }

    swap(array, end - 1, j);
    return j;
}

function swap(items, leftIndex, rightIndex) {
    let temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

let data = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5]

console.log(qSort(data))

//4) Implementing mergeSort:

let mSort = function(array) {
    if(array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);

    left = mSort(left);
    right = mSort(right);
    return merge(left, right, array);
}

function merge(left, right, array) {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
        } else {
            array[outputIndex++] = right[rightIndex++];
        }
    }

    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    }
    
    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    }

    return array;
}

console.log(mSort(data))

//5) Sorting a linked list using merge sort:

class _Node { //'_' deliniates a private class - only accessible in the linked list class
    constructor(value, next, previous) {
        this.value = value;
        this.next = next;
        }
}

class LinkedList {
    constructor() {
        this.head = null; //head starts at null since the list is empty - head indicates the beginning of the list
    }

    insertFirst(item) {
        this.head = new _Node(item, this.head);
    }

    insertBefore(item, newItem) {

        let currNode = this.head;

        if (this.head === null) {
            this.insertFirst(item)
        }

        while (currNode.value !== item) {
            if (currNode.next === null) {
                return null;
            }
            //Otherwise, keep looking/scanning
            else {
                currNode = currNode.next;
            }
        }

        currNode.previous = new _Node(newItem, item)
    }

    insertAfter(item, newItem) { //item = t, newItem = d
        let current = this.head;

        while (current !== null) {
            if (current.value === item) {
                let temp = new _Node;
                temp.value = newItem;
                temp.next = current.next;
                if (current == this.end) {
                    this.end = temp;
                }
                current.next = temp
                return
            }
            current = current.next;
        }
    }


    insertLast(item) {
        if (this.head === null) { //if the head is null, that means there are no items in the list, so insert at start
            this.insertFirst(item)
        }
        else {
            let tempNode = this.head;
            while (tempNode.next !== null) { //Keep scanning the list until the end is found, signified by the null head
                tempNode = tempNode.next;
            }
            tempNode.next = new _Node(item, null)
        }
    }

    insertAt(item, index) {
        if (index > 0) {
            return false;
        }
        else {
            let temp = new _Node(item);
            let curr = this.head;
            let prev

            if (index === 0) {
                temp.next = head;
                this.head = temp;
            } else {
                let curr = head;
                let it = 0;

                while (it < index) {
                    it ++;
                    prev = curr;
                    curr = curr.next;

                }

                temp.next = curr;
                prev.next = temp
            }
        }
    }

    find(item) {
        //Starting at the head
        let currNode = this.head;
        // If the list is empty
        if (!this.head) {
            return null;
        }
        //Check for the item, moving down the nodes in the list
        while (currNode.value !== item) { //Keep scanning until the value at the node equals the item
            //Return null if you reach the end of the list and the item wasn't found
            if (currNode.next === null) {
                return null;
            }
            //Otherwise, keep looking/scanning
            else {
                currNode = currNode.next;
            }
        }
        return currNode //Return if the value is found
    }

    remove(item) {
        //If the list is empty
        if (!this.head) {
            return null;
        }
        //If the node to be removed is the head, create the next node head
        if (this.head.value === item) {
            this.head = this.head.next;
            return;
        }

        //Start at the head
        let currNode = this.head;
        //Keep track of previous nodes scanned
        let previousNode = this.head;
        
        while ((currNode !== null) && (currNode.value !== item)) { //while the value hasn't been found yet, or when the current node doesn't exist
            //Save the previous node
            previousNode = currNode;
            currNode = currNode.next;
        }
        if (currNode === null) {
            console.log('Item not found');
            return;
        }
        previousNode.next = currNode.next;
    }

    length() {
        if (!this.head) {
            return null;
        }

        let node = this.head;
        let length = 0;
        while (node != null) {
            length += 1;
            node = node.next;
        }

        return length
    }

}

let testList = new LinkedList;

testList.insertFirst(12);
testList.insertLast(91);
testList.insertLast(55);
testList.insertLast(21);
testList.insertLast(85);
testList.insertLast(5);
testList.insertLast(34);

let mergeSortLinkedList = function(list) {
    let head = list.head;

    let node = head;

    let valuesArray = [];

    while (node.next !== null) {
        valuesArray.push(node.value)
        node = node.next;
    }
    
    return mSortLinkedList(valuesArray)
}

function mSortLinkedList(array) {
    if (array.length <= 1) { //mergeSort is repeated until only individual items are present
        return array;
    }

    const middle = Math.floor(array.length / 2); //get the middle index of the array
    let left = array.slice(0, middle) //slice from start to middle
    let right = array.slice(middle, array.length); //slice from middle to end

    left = mSortLinkedList(left); //run mergeSort again with an array half the size
    right = mSortLinkedList(right);

    return mergeLinkedList(left, right, array);
}

function mergeLinkedList(left, right, array) {
    let leftIndex = 0; //all indexes start at zero
    let rightIndex = 0;
    let outputIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) { //while not at the end of either left or right arrays
        if (left[leftIndex] < right[rightIndex]) { //if left value is less than right value at same position
            array[outputIndex++] = left[leftIndex++]; //
        } else {
            array[outputIndex++] = right[rightIndex++];
        }
    }

    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    }

    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    }

    return array;
}

console.log(mergeSortLinkedList(testList))

console.log(testList.length())

//6) Bucket sort

//Write O(n) algorithm to sort an array of integers where you know what the lowest and highest values are
//Cannot use arr.splice(), arr.shift(), and arr.unshift()

function bucketSort(array, bucketSize) {
    if (array.length === 0) {
        return array;
    }

    //Determine minimum and maximum values

    let i;
    let minValue = array[0];
    let maxValue = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] < minValue) {
            minValue = array[i];
        } else if (array[i] > maxValue) {
            maxValue = array[i];
        }
    }

    let DEFAULT_BUCKET_SIZE = 5;
    bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
    let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    let buckets = new Array(bucketCount);
    for (let i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }

    //Distrubute the array values into buckets
    for (let i = 0; i < array.length; i++) {
        buckets[Math.floor((array[i] - minValue) / bucketSize)].push(array[i]);
    }

    //Sort the buckets and place back into input array
    array.length = 0;
    for (let i = 0; i < buckets.length; i++) {
        insertionSort(buckets[i]);
        for (let j = 0; j < buckets[i].length; j++) {
            array.push(buckets[i][j]);
        }
    }

    return array;
}

function insertionSort(array) {
    let length = array.length;
    for(let i = 0; i < length; i++) {
        let el = array[i];
        let j;

        for (j = i-1; j >= 0 && array[j] > el; j--) {
            array[j + 1] = array[j];
        }
        array[j + 1] = el;
    }
    return array;
}


let bucketArray = [9, 26, 24, 17, 4, 22];

console.log(bucketSort(bucketArray))

//7) Sort in place
//Write an algorithm to shuffle an array into a random order in place(without creating a new array);

function sortInPlace(array) {
    if (array.length <= 1) {
        return array;
    }

    for(let i = 0; i < array.length; i++) {
        const position = Math.floor(Math.random() * array.length);
        array[position] = array[i];
    }

    return array;
}

let testSortArray = [54, 86, 34, 98, 12, 16, 99, 28]

console.log(sortInPlace(testSortArray))

//8) Sorting books
//Given 20 books to sort in alphabetical order - make an algorithm for this

function sortBooks(booksArray) {
    return booksArray.sort();
}

let booksArray = ['Enders Game', 'Three Blind Mice', 'Alex Stormrider', 'Unbroken', 'jQuery book']
