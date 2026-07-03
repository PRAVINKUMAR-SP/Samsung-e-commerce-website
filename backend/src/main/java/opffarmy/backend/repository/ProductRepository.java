package opffarmy.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import opffarmy.backend.entity.Product;


public interface ProductRepository 
extends JpaRepository<Product,Long>{

}