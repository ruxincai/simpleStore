package shu.example;

import org.postgresql.ds.PGPoolingDataSource;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;

/**
 * Base implementation of {@link Servlet}.
 */
public abstract class BaseServlet implements Servlet {

/** The data source. */
protected static final PGPoolingDataSource DATA_SOURCE;
protected static final String TEXT_JSON = "text/json;charset=UTF-8";

static {
	DATA_SOURCE = new PGPoolingDataSource();
	DATA_SOURCE.setUser("postgres");
	DATA_SOURCE.setDatabaseName("shopping");
}

@Override
public void init(ServletConfig servletConfig) throws ServletException {
}

@Override
public ServletConfig getServletConfig() {
	return null;
}

@Override
public String getServletInfo() {
	return null;
}

@Override
public void destroy() {
}
}
