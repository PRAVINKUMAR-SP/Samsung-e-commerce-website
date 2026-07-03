package opffarmy.backend.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="products")
public class Product {



@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;



private String name;


@Column(columnDefinition="TEXT")
private String description;



private Double price;


private Double discountPrice;


private String category;


private String brand;


private String image;



@Column(columnDefinition="TEXT")
private String specifications;





public Product(){

}





public Long getId(){

return id;

}


public void setId(Long id){

this.id=id;

}



public String getName(){

return name;

}


public void setName(String name){

this.name=name;

}



public String getDescription(){

return description;

}


public void setDescription(String description){

this.description=description;

}




public Double getPrice(){

return price;

}


public void setPrice(Double price){

this.price=price;

}




public Double getDiscountPrice(){

return discountPrice;

}


public void setDiscountPrice(Double discountPrice){

this.discountPrice=discountPrice;

}




public String getCategory(){

return category;

}


public void setCategory(String category){

this.category=category;

}




public String getBrand(){

return brand;

}


public void setBrand(String brand){

this.brand=brand;

}




public String getImage(){

return image;

}


public void setImage(String image){

this.image=image;

}




public String getSpecifications(){

return specifications;

}


public void setSpecifications(String specifications){

this.specifications=specifications;

}



}