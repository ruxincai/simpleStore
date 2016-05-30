package shu.example.handlers;

import org.apache.commons.lang3.StringEscapeUtils;
import org.jetbrains.annotations.NotNull;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

public class ProductsHandler extends Handler {

private static final String QUERY =
		"SELECT * FROM product ORDER BY 2";

@Override
public void handle(@NotNull HttpServletRequest request,
		@NotNull HttpServletResponse response, @NotNull Connection db,
		@NotNull List<String> ids)
		throws IOException, SQLException {
	try (PreparedStatement statement = db.prepareStatement(QUERY)) {
		try (ResultSet resultSet = statement.executeQuery()) {
			PrintWriter writer = response.getWriter();
			boolean first = true;
			writer.write('[');
			while (resultSet.next()) {
				if (first) {
					first = false;
				}
				else {
					writer.write(',');
				}
				writer.write("{\"id\":");
				writer.write(resultSet.getString(1));
				writer.write(",\"code\":\"");
				StringEscapeUtils.ESCAPE_JSON.translate(
						resultSet.getString(2), writer);
				writer.write("\",\"name\":\"");
				StringEscapeUtils.ESCAPE_JSON.translate(
						resultSet.getString(3), writer);
				writer.write("\",\"description\":\"");
				StringEscapeUtils.ESCAPE_JSON.translate(
						resultSet.getString(4), writer);
				writer.write("\",\"price\":");
				writer.write(String.valueOf(resultSet.getDouble(5)));
				writer.write(",\"imagePath\":\"");
				String path = resultSet.getString(6);
				writer.write(path == null ? "" : path);
				writer.write("\"}");
			}
			writer.write("]");
		}
	}
}

}
