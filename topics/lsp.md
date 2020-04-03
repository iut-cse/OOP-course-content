# Liskov Substitution Principle
### Prerequisites
1. [Polymorphism](polymorphism)
2. [Inheritance](inheritance)
3. [Open Closed Principle](ocp)

## Problem
There is a Rectangle class which has height and width.
We can calculate the area of the Rectangle and can generate a string that represents a graphical form of the rectangle. 

```Java
// Language: Java
class Rectangle {
    private int height;
    private int width;

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int area() {
        return height * width;
    }

    public String draw() {
        // The code does not cover all cases.
        // It has not been implemented properly to make it simple.
        String drawing = "";
        for (int c = 0; c < width; c++){
            drawing += "-";
        }
        for (int r = 1; r < height-1; r++){
            drawing += "\n";
            drawing += "|";
            for (int c = 1; c < width-1; c++){
                drawing += " ";
            }
            drawing += "|";
        }

        drawing += "\n";
        for (int c = 0; c < width; c++){
            drawing += "-";
        }

        return drawing;
    }
}
```

Now, our software requires a Square class for which we also need to calculate the area and draw it just like the Rectangle.  

* Task: Write the Square class.
* Constraint: Reuse the code of the Rectangle class

## A solution
Some students may inheritance as a solution to this problem.
The solution involves overriding the setters to keep both sides of the Square equal.

```Java
// Language: Java
class Square extends Rectangle {
    @Override
    public void setHeight(int height) {
        super.setHeight(height);
        super.setWidth(height);
    }

    @Override
    public void setWidth(int width) {
        super.setWidth(width);
        super.setHeight(width);
    }
}
```

This Square class makes sense, it will pass the regular test cases.
Additionally, Square _is a_ Rectangle by geometric definition.
We have also created an is-a relation by inheriting.

Now, consider the following code that existed already.

```java
// Language: Java
void growDouble(Rectangle rectangle){
    rectangle.setHeight(rectangle.getHeight() * 2);
    rectangle.setWidth(rectangle.getWidth() * 2);
}
```

Due to inheritance, Square can be substitutable for Rectangle.
That is we can pass an object of Square in the `growDouble` method.
That means we can do the following.
```java
// Language: Java
Square square = new Square();
square.setHeight(4);
growDouble(square);
```
> Ask: what happens if this code is run?  
> Answer: the square is grown 4 times instead of 2.

So, the situation is like this: We cannot pass an object of subclass in a method where superclass was expected due to a problem in the run time.
Note that the problem is not in the compilation time.
The code does compile.
But it behaves unexpectedly when run.

We can solve it by changing the `growDouble` method like below:
```Java
Language: Java
void growDouble(Rectangle rectangle) {
    if (rectangle instanceof Square) {
        rectangle.setWidth(rectangle.getHeight() * 2);
    } else {
        rectangle.setHeight(rectangle.getHeight() * 2);
        rectangle.setWidth(rectangle.getWidth() * 2);
    }
}
```
> Ask: is there a problem with this solution?  
> Answer: it violates [OCP](ocp).

## A better solution
## Discussion
## Practice problems