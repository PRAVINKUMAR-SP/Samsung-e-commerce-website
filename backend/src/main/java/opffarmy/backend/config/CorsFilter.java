package opffarmy.backend.config;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Set;

/**
 * Global CORS filter that runs before any other filter in the chain.
 * This ensures CORS headers are always present, even for preflight OPTIONS
 * requests that might otherwise be rejected before reaching Spring MVC's
 * CORS processing.
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsFilter implements Filter {

    private static final Set<String> ALLOWED_ORIGIN_PATTERNS = Set.of(
            "samsung-e-commerce-website",
            "localhost"
    );

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        String origin = request.getHeader("Origin");

        if (origin != null && isAllowedOrigin(origin)) {
            response.setHeader("Access-Control-Allow-Origin", origin);
            response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            response.setHeader("Access-Control-Allow-Headers", "*");
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.setHeader("Access-Control-Max-Age", "3600");
        }

        // For preflight OPTIONS requests, return 200 immediately
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        chain.doFilter(req, res);
    }

    private boolean isAllowedOrigin(String origin) {
        // Allow any Vercel deployment of the samsung site
        if (origin.contains("vercel.app") && origin.contains("samsung-e-commerce-website")) {
            return true;
        }
        // Allow the exact production Vercel URL
        if (origin.equals("https://samsung-e-commerce-website-9rfbcr618.vercel.app")) {
            return true;
        }
        // Allow any *.vercel.app for preview deployments
        if (origin.endsWith(".vercel.app")) {
            return true;
        }
        // Allow localhost for development
        if (origin.contains("localhost")) {
            return true;
        }
        return false;
    }
}
