package com.jwt.implementaion.service;

import com.jwt.implementaion.entity.Category;
import com.jwt.implementaion.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    private static final Logger logger = LoggerFactory.getLogger(CategoryService.class);

    public List<Category> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        logger.info("Categories fetched: {}", categories);  // Logging the categories
        return categories;
    }
}
