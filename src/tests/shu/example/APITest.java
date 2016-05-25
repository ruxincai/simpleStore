package shu.example;

import java.io.StringReader;
import java.util.List;
import java.util.Map;

import junit.framework.TestCase;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

public class APITest extends TestCase {

private APIServlet servlet;
private MockHttpServletRequest request;
private MockHttpServletResponse response;

public void setUp() {
	servlet = new APIServlet();
	request = new MockHttpServletRequest();
	request.setServerName("www.example.com");
	response = new MockHttpServletResponse();
}

public void testGetProducts() throws Exception {
	request.setPathInfo("/products");
	request.setMethod("GET");

	servlet.service(request, response);
	String result = new String(response.getContentAsByteArray());
	Object object = new JSONParser(new StringReader(result)).parse();
	assertTrue("is list", object instanceof List);
	@SuppressWarnings("unchecked")
	List<Object> list = (List<Object>)object;
	if (!list.isEmpty()) {
		@SuppressWarnings("unchecked")
		Map<String, Object> product =
				(Map<String, Object>)list.iterator().next();
		assertNotNull("missing id", product.get("id"));
		assertNotNull("missing code", product.get("code"));
		assertNotNull("missing name", product.get("name"));
		assertNotNull("missing description, but it is nullable",
				product.get("description"));
		assertNotNull("missing price, but nullable", product.get("price"));
		assertNotNull("missing imagePath but nullable", product.get("imagePath"));
	}
}

}
