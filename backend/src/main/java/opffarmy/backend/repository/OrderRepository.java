package opffarmy.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import opffarmy.backend.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Get orders by customer phone
    List<Order> findByPhone(String phone);

    // Get orders by customer name
    List<Order> findByCustomerName(String customerName);

    // Get orders by status
    List<Order> findByOrderStatus(String orderStatus);

    // Get orders by payment method
    List<Order> findByPaymentMethod(String paymentMethod);

}