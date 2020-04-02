# Liskov Substitution Principle
## Problem
There is a Rectangle class which has height and width. We can calculate area of the Rectangle and can generate a string that represents a graphical form of the rectangle. 

```java
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

Now, our software require a Square class for which we also need to calculate the area and draw it just like the Rectangle.  

* Task: Write the Square class.
* Constraint: Reuse the code of the Rectangle class

## A solutions
## A better solution
## Discussion
## Practice problems