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

public class GetAllProducts extends Handler {

private static final String QUERY =
		"SELECT * FROM product ORDER BY 3";

@Override
public void handle(@NotNull HttpServletRequest request,
		@NotNull HttpServletResponse response, @NotNull Connection db,
		@NotNull List<String> ids)
		throws IOException, SQLException {
	try (PreparedStatement statement = db.prepareStatement(QUERY)) {
		Map<String, Map<String, Object>> map = new LinkedHashMap<>();
/*		try (ResultSet resultSet = statement.executeQuery()) {

			writer.write("{\"id\":");
			writer.write(id);
			writer.write(",\"userName\":\"");
			StringEscapeUtils.ESCAPE_JSON.translate(
					(String) subMap.get("userName"), writer);
			writer.write("\",\"last_update\": ");
			writer.write(String.valueOf(subMap.get("last_update")));
			writer.write(",\"city\":\"");
			StringEscapeUtils.ESCAPE_JSON.translate(
					(String) subMap.get("city"), writer);
			writer.write("\",\"text\":\"");
			StringEscapeUtils.ESCAPE_JSON.translate(
					(String) subMap.get("text"), writer);
			writer.write("\",\"responses\": [");
			@SuppressWarnings("unchecked")
			List<String> responses = (List<String>)subMap.get("responses");
			for (int i = 0; i < responses.size(); i++) {
				if (i != 0) {
					writer.print(',');
				}
				writer.write("\"");
				StringEscapeUtils.ESCAPE_JSON.translate(
						responses.get(i), writer);
				writer.write("\"");
			}
			writer.write("]}");
		}
		writer.write("]");*/
	}
}

}
