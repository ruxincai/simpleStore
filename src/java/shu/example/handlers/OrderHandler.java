package shu.example.handlers;

import com.google.gson.Gson;
import com.google.gson.JsonParser;
import org.jetbrains.annotations.NotNull;
import shu.example.JSONParser;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

public class OrderHandler extends Handler {

private static final String QUERY =
		"INSERT INTO transaction (detail, confirm_time) " +
				"VALUES(to_json(?::json), ?) RETURNING id";
/** Data source error code*/
private static final String UNIQUE_VIOLATION = "23505";

@Override
public void handle(@NotNull HttpServletRequest request,
		@NotNull HttpServletResponse response,
		@NotNull Connection db, @NotNull List<String> ids)
		throws IOException, SQLException {
	Map parameterMap = request.getParameterMap();
	String json = new Gson().toJson(parameterMap);
	if (json == null) {
		sendError(response, HttpServletResponse.SC_BAD_REQUEST,
				"Missing request body");
		return;
	}
	Timestamp confirmTime = new Timestamp(System.currentTimeMillis());

	try (PreparedStatement statement = db.prepareStatement(QUERY)) {
		statement.setString(1, json);
		statement.setTimestamp(2, confirmTime);
		try (ResultSet resultSet = statement.executeQuery()) {
			resultSet.next();

			response.sendRedirect(request.getContextPath() +
					"/checkout?tid=" + resultSet.getString(1));
		}
		catch (SQLException e) {
			if (UNIQUE_VIOLATION.equals(e.getSQLState())) {
				sendError(response, HttpServletResponse.SC_CONFLICT,
						"Duplicated name");
			}
			else {
				throw e;
			}
		}
	}
}

}
