package shu.example.handlers;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringEscapeUtils;
import org.jetbrains.annotations.NotNull;

public class TransactionsHandler extends Handler {

private static final String QUERY =
		"SELECT * FROM transaction WHERE id = ?";

@Override
public void handle(@NotNull HttpServletRequest request,
		@NotNull HttpServletResponse response, @NotNull Connection db,
		@NotNull List<String> ids) throws IOException, SQLException {
	assert ids.size() == 1 : "Expecting one identifier";
	Integer id = Integer.parseInt(ids.get(0));
	try (PreparedStatement statement = db.prepareStatement(QUERY)) {
		statement.setInt(1, id);
		try (ResultSet resultSet = statement.executeQuery()) {
			PrintWriter writer = response.getWriter();
			while (resultSet.next()) {
				StringEscapeUtils.UNESCAPE_JSON.translate(
						resultSet.getString(2), writer);
			}
		}
	}
}

}
