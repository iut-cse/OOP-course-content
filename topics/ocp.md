# Open Closed Principle
## Problem
You need to write a `ShapeGroup` class which will contain a list of regular shapes.
Currently, types equilateral triangles and circle need to be supported.
The `ShapeGroup` class needs methods `totalArea` and `totalPerimeter` which calculate total area and total perimeter respectively of all the containing shapes.

## A solution
The following solution can be tempting.

```java
// Language: Java
import java.util.List;

class RegularShape {
    String type;
    float dimension;

    public RegularShape(String type, float dimension) {
        this.type = type;
        this.dimension = dimension;
    }
}

class ShapeGroup {
    private List<RegularShape> shapes;

    public ShapeGroup(List<RegularShape> shapes) {
        this.shapes = shapes;
    }

    public float totalArea() {
        float area = 0;
        for (RegularShape shape : shapes) {
            if (shape.type == "triangle")
                area += 0.43 * shape.dimension * shape.dimension;
            else if (shape.type == "circle")
                area += 3.14 * shape.dimension * shape.dimension;
        }

        return area;
    }

    public double totalPerimeter() {
        double perimeter = 0;
        for (RegularShape shape : shapes) {
            if (shape.type == "triangle")
                perimeter += 3 * shape.dimension;
            else if (shape.type == "circle")
                perimeter += 2 * 3.14 * shape.dimension;
        }

        return perimeter;
    }
}
```

Here is a unit test case for the solution.
Just one case has been given for brevity.

```java
// Language: Java, Framework: JUnit 5

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

class ShapeGroupTest {
    @Test // Green
    public void area() {
        List<RegularShape> shapes = Arrays.asList(
                new RegularShape("triangle", 2),
                new RegularShape("circle", 3)
        );
        ShapeGroup group = new ShapeGroup(shapes);

        Assertions.assertEquals(29.98f, group.totalArea());
    }
}
```

There are several downsides with this solution.
1. The name `dimension` is too generic and often unclear. For a circle, is it the radius or the diameter?
2. The type names are string, which a programmer can easily misspell. Even worse, we have the ability of creating unsupported shapes.
3. The conditional structure (if-else) in the two methods are duplicate.
4. If we need to support a new type, say pentagon, we need to modify both of the methods.

The last two points are very critical.
The `totalArea` and `totalPerimeter` methods are only two examples.
This is likely that there are other places where similar conditional structure exist.
Whenever we need to introduce a new type of regular shape, we will have to find and update all the places.

> Ask: Can we make it better?

At this point, the instructor should give some more time for thinking about the problem. A group discussion can be allowed.

## A better solution
```java
// Language: Java
import java.util.List;

interface RegularShape {
    float area();
    float perimeter();
}

class EquilateralTriangle implements RegularShape {
    private float side;

    EquilateralTriangle(float side) {
        this.side = side;
    }

    @Override
    public float area() {
        return 0.43f * side * side;
    }

    @Override
    public float perimeter() {
        return 3 * side;
    }
}

class Circle implements RegularShape {
    private float radius;

    Circle(float radius) {
        this.radius = radius;
    }

    @Override
    public float area() {
        return 3.14f * radius * radius;
    }

    @Override
    public float perimeter() {
        return 2 * 3.14f * radius;
    }
}

class ShapeGroup {
    private List<RegularShape> shapes;

    public ShapeGroup(List<RegularShape> shapes) {
        this.shapes = shapes;
    }

    public float totalArea() {
        float area = 0;
        for (RegularShape shape : shapes)
            area += shape.area();

        return area;
    }

    public double totalPerimeter() {
        double perimeter = 0;
        for (RegularShape shape : shapes)
            perimeter += shape.perimeter();

        return perimeter;
    }
}
```
Test Code:
```java
// Language: Java, Framework: JUnit 5
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

class ShapeGroupTest {
    @Test
    public void area() {
        List<RegularShape> shapes = Arrays.asList(
                new EquilateralTriangle(2),
                new Circle(3)
        );
        ShapeGroup group = new ShapeGroup(shapes);

        Assertions.assertEquals(29.98f, group.totalArea());
    }
}
```

## Discussion
With the new solution, in order to introduce a new type of regular shape, all we need to do is to create a subtype of the `RegularShape` interface.
We will not have to make any changes to `ShapeGroup` class.
The first solution had violated the _Open Closed Principle_ (OCP, O of Solid) which states:
> software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.  

Notice that all three downsides of the first solution has disapeared.

### Notes
1. In the given example, the `ShapeGroup` class is open for extension and closed for modification. This idea needs to be clearly communicated.
2. OCP, [dynamic polymorphism](polymorphism) and strategy design patterns are the similar concepts, just approached differently. They give a good way of working with _similar objects with different behaviour_. In the strategy pattern, the _context_ is open for extension and closed for modification.
3. OCP is a very fundamental and extreemly important concept of OOP. OCP compliance of a code makes it extensible and reusable. Make sure that the students have clear understanding of it.

## Practice
The students should be able to solve the following problems.

**Problem 1**  
1. Introduce a `RegularPentagon` class in the system.
2. Add a test case and assert that the total perimeter is 21 for:
   - 1 pentagon of side = 2
   - 1 triangle of size = 3  
3. Make sure that your do not make any change in the `ShapeGroup` class.

**Problem 2**  
1. Write a problem in that should comply with OCP. 
   1. Do not search on the Internet or book. 
   2. Observe your surroundings for different but of similar types of objects.
   3. Notice how the objects performs similar tasks differently.
2. Write code to solve your problem. 
3. Answer - Which class in your problem is open for extension and closed for modification?

**Problem 3**
1. Get a problem from one or more of your classmates who have completed **Problem 2** above.
2. Solve their problems.
3. Answer - Which class in your classmates problem is open for extension and closed for modification?

**Discuss**
1. Discuss your problem with other classmets.
2. Argue about which class is OCP compliant.
