package com.jwt.implementaion.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
//import jakarta.persistence.CascadeType;  // Correct import for CascadeType
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;  
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;  // Correct import for JoinColumn
import jakarta.persistence.Table;

@Entity
@Table(name = "Product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double original_price;
    private double discounted_price;
    private int stock_count;
    private String image_url;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonBackReference // Prevents recursion on this side
    private Category category;
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getOriginalPrice() { return original_price; }
    public void setOriginalPrice(double originalPrice) { this.original_price = originalPrice; }

    public double getDiscountedPrice() { return discounted_price; }
    public void setDiscountedPrice(double discountedPrice) { this.discounted_price = discountedPrice; }

    public int getStockCount() { return stock_count; }
    public void setStockCount(int stockCount) { this.stock_count = stockCount; }

    public String getImageUrl() { return image_url; }
    public void setImageUrl(String imageUrl) { this.image_url = imageUrl; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
}
