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
## Practice problems