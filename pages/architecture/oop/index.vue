<template>
  <notes-paper>
    <template v-slot:header>
      <h1>Object-Oriented Programming</h1>
    </template>
    <section>
      <h3>Encapsulation</h3>
      <p>Encapsulation is the process of hiding a class's internal data to prevent the client from directly accessing it.</p>
      <pre><notes-code syntax="python">
class Data():
    def __init__(self):
        # the understore prefix implies this property is private
        # clients manipulate this variable at their own risk
        self._nums = [1, 2, 3, 4, 5]

    # this method exposes the approved API
    # for interacting with the private state
    def change_data(self, i: int, n: int) -> None:
        self._nums[i] = n
</notes-code></pre>
    </section>
    <section>
      <h3>Abstraction</h3>
      <p>Abstraction is the process of "taking away or removing characteristics from something to reduce it to a set of essential characteristics."</p>
      <pre><notes-code syntax="python">
# abstract the concept of a point in 2-D space
# rather than duplicating the subtraction logic
class Point():
    def __init__(self, x, y):
        self.coordinates = (x,y)

    def __sub__(self, b: "__class__") -> "__class__":
        return Point(self.coordinates[0] - b.coordinates[0], self.coordinates[1] - b.coordinates[1])

class Line():
    def __init__(self, start: Point, end: Point):
        self.start = start
        self.end = end

    def magnitude(self) -> float:
        diff = self.start - self.end
        return abs(diff.coordinates[1]) / abs(diff.coordinates[0])


class Rect():
    def __init__(self, top_left: Point, bottom_right: Point):
        self.top_left = top_left
        self.bottom_right = bottom_right

    def area(self) -> float:
        diff = self.top_left - self.bottom_right
        return diff.coordinates[0] * diff.coordinates[1]

p1 = Point(1,2)
p2 = Point(3,5)
l = Line(p1, p2)
r = Rect(p1, p2)
print(l.magnitude())
# 1.5
print(r.area())
# 6
      </notes-code></pre>
    </section>
    <section>
      <h3>Polymorphism</h3>
      <p>Polymorphism is the ability in programming to present the same interface for different data types.</p>
      <pre><notes-code syntax="python">
from random import choice

# define different classes which all have a common API
class Foo():
    def act(self):
        print("foo")

class Bar():
    def act(self):
        print("bar")

class Qux():
    def act(self):
        print("qux")

# randomly select one of several different classes...
instances = [Foo(), Bar(), Qux()]
for _ in range(10):
    instance = choice(instances)
    # ...and invoke the same code irrespective of the underlying implementation.
    instance.act()
</notes-code></pre>
    </section>
    <section>
      <h3>Inheritance</h3>
      <p>Classes can inherit methods and variables from another class.</p>
      <pre><notes-code syntax="python">
class Parent_Example():
    def some_method(self):
        return "This method was defined in the parent."
    def some_other_method(self):
        return "This method was also defined in the parent."

class Child_Example(Parent_Example):
    def some_other_method(self):
        return super().some_other_method() + " But then overriden in the child."

c = Child_Example()
print(c.some_method())
# This method was defined in the parent.
print(c.some_other_method())
# This method was also defined in the parent. But then overriden in the child.
</notes-code></pre>
    </section>
  </notes-paper>
</template>

<script>
  import NotesPaper from '../../../components/NotesPaper'
  import NotesOutline from '../../../components/NotesOutline'
  import NotesCode from '../../../components/NotesCode'

  export default {
    components: {
      NotesPaper,
      NotesOutline,
      NotesCode
    }
  }
</script>

<style scoped>

</style>
