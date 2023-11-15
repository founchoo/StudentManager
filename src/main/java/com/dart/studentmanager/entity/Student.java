package com.dart.studentmanager.entity;

public class Student {

    private String id;
    private String name;
    private String sex;
    private String age;

    private String birth;

    private String address;

    private String phone;

    private String email;

    public Student(String id, String name, String age, String sex, String birth, String address, String phone, String email) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.birth = birth;
        this.address = address;
        this.phone = phone;
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getBirth() {
        return birth;
    }

    public void setBirth(String birth) {
        this.birth = birth;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getInfo() {
        return this.id + "\n" + this.name + "\n" + this.sex + "\n" + this.age;
    }
}