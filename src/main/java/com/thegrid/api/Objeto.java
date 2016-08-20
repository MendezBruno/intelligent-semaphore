package com.thegrid.api;

import java.util.ArrayList;

/**
 * Created by Ezequiel on 20/08/2016.
 */
public class Objeto {
    public ArrayList<String> subNames;
    public String str = "asd";

    public Objeto() {};

    public Objeto(String name) {
        str = name;
        subNames = new ArrayList<>();
    }

    public Objeto(String name, ArrayList<String> subNames) {

        this(name);
        this.subNames = subNames;
    }
}
