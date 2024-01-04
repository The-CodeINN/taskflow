# Use the official Microsoft SQL Server 2019 image as the base image
FROM mcr.microsoft.com/mssql/server:2019-latest

# Set environment variables for SQL Server
ENV SA_PASSWORD=<YourStrongPassword>
ENV ACCEPT_EULA=Y

# Create a directory for data persistence
ENV MSSQL_DATA_DIR=/var/opt/mssql/data
ENV MSSQL_LOG_DIR=/var/opt/mssql/log

# Create directories and make them accessible
USER root
RUN mkdir -p $MSSQL_DATA_DIR $MSSQL_LOG_DIR && \
    chown -R mssql:mssql $MSSQL_DATA_DIR $MSSQL_LOG_DIR

# Switch back to the mssql user
USER mssql

# Expose the SQL Server port
EXPOSE 1433

# Specify the working directory
WORKDIR /var/opt/mssql

# The entry point script will run when the container starts
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

# Additional CMD if needed
CMD ["/opt/mssql/bin/sqlservr"]