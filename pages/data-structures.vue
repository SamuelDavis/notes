<template>
  <notes-paper>
    <template v-slot:header>
      <h1>Data Structures and Algorithms</h1>
    </template>
    <section>
      <h3>Vocabulary</h3>
      <ul>
        <li>A <em>data structure (DS)</em> is a way of organizing data so that it can be used effectively.</li>
        <li>An <em>abstract data type (ADT)</em> is an abstraction of a data structure which provides on the interface to which a data structure must adhere to.</li>
      </ul>
    </section>
    <section>
      <h3>Big-O Notation</h3>
      <p>Big-O Notation gives an upper bound of the complexity in the <i>worst</i> case, helping to quantify performance as the input size becomes arbitrarily large. Theoretically, constants can be ignored.</p>
      <small>* <em>n</em> is the size of the input.</small>
      <ul>
        <li>Constant Time: <code>O(1)</code></li>
        <li>Logarithmic Time: <code>O(log(n))</code></li>
        <li>Linear Time: <code>O(n)</code></li>
        <li>Linearithmic Time: <code>O(nlog(n))</code></li>
        <li>Quadric Time: <code>O(n<sup>2</sup>)</code></li>
        <li>Cubic Time: <code>O(n<sup>3</sup>)</code></li>
        <li>Exponential Time: <code>O(b<sup>n</sup>)</code></li>
        <li>Factorial Time: <code>O(n!)</code></li>
        <li>...</li>
      </ul>
      <notes-outline label="Common examples">
        <ul>
          <li>Finding all the subsets of a set: <code>O(n<sup>2</sup>)</code></li>
          <li>Finding all permutations of a string: <code>O(n!)</code></li>
          <li>Sorting using mergesort: <code>O(nlog(n))</code></li>
          <li>Iterating over all the cells in a matrix size n by m: <code>O(mn)</code></li>
        </ul>
      </notes-outline>
      <div class="inline">
        <notes-outline label="Linear examples">
        <pre><notes-code syntax="javascript">
let i = 0
while (i < n)
  i = i + 1
// f(n) = n
// O(f(n)) = O(n)</notes-code></pre>
          <pre><notes-code syntax="javascript">
let i = 0
while (i < n)
  i = i + 3
// f(n) = n / 3
// O(f(n)) = O(n)</notes-code></pre>
        </notes-outline>
        <notes-outline label="Quadratic examples">
        <pre><notes-code syntax="javascript">
for (let i = 0; i < n; i = i + 1)
  for (let j = 0; j < n; j = j + 1)
// f(n) = n * n = n<sup>2</sup>
// O(f(n)) = O(n<sup>2</sup>)</notes-code></pre>
          <pre><notes-code syntax="javascript">
for (let i = 0; i < n; i = i + 1)
  for (let j = i; j < n; j = j + 1)
// (n) + (n - 1) + (n - 2) + (n - 3) + &hellip; + 3 + 2 + 1
// O(n(n + 1) / 2) = O(n<sup>2</sup> / 2 + n / 2) = O(n<sup>2</sup>)</notes-code></pre>
        </notes-outline>
        <notes-outline class="inline" label="Logarithmic example">
          <pre><notes-code syntax="javascript">
let low = 0
let high = n - 1
while (low <= high) {
  const mid = (now + high) / 2
  if (arr[mid] === value) return mid
  if (arr[mid] < value) low = mid + 1
  else if (arr[mid] > value) high = mid - 1
}
return -1
// O(log<sub>2</sub>(n)) = O(log(n))</notes-code></pre>
          <pre><notes-code syntax="javascript">
let n = 0
let i = 0
while (i < n) {
  let j = 0
  while (j < 3 * n)
    j = j + 1
  j = 0
  while (j < 2 * n)
    j = j + 1
  i = i + 1
}
// f(n) = n * (3n + 2n) = 5n<sup>2</sup>
// O(f(n)) = O(n<sup>2</sup>)</notes-code></pre>
          <pre><notes-code syntax="javascript">
let n = 0
let i = 0
while (i < 3 * n) {
  let j = 10
  while (j <= 50)
    j = j + 1
  j = 0
  while (j < n * n * n)
    j = j + 2
  i = i + 1
}
// 3n * (40 + (n^3 / 2))
// 3n / 40 + 3n<sup>4</sup> / 2
// O(f(n)) = O(n<sup>4</sup>)</notes-code></pre>
        </notes-outline>
      </div>
    </section>
  </notes-paper>
</template>

<script>
  import NotesPaper from '../components/NotesPaper'
  import NotesOutline from '../components/NotesOutline'
  import NotesCode from '../components/NotesCode'

  export default {
    components: {
      NotesPaper,
      NotesOutline,
      NotesCode
    }
  }
</script>

<style lang="scss" scoped>
  .inline > *:not(.label) {
    display: inline-block;
    vertical-align: top;
  }
</style>
