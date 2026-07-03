package opffarmy.backend.service;


import java.util.List;

import org.springframework.stereotype.Service;

import opffarmy.backend.entity.Product;
import opffarmy.backend.repository.ProductRepository;



@Service
public class ProductService {



private final ProductRepository repo;



public ProductService(ProductRepository repo){

this.repo=repo;

}




public List<Product> getAll(){

return repo.findAll();

}





public Product add(Product product){

return repo.save(product);

}




public Product update(Long id, Product p){


Product old = repo.findById(id).get();


old.setName(p.getName());
old.setDescription(p.getDescription());
old.setPrice(p.getPrice());
old.setDiscountPrice(p.getDiscountPrice());
old.setCategory(p.getCategory());
old.setBrand(p.getBrand());
old.setSpecifications(p.getSpecifications());


return repo.save(old);

}




public void delete(Long id){

repo.deleteById(id);

}


}