import mysql, {
  Pool,
  RowDataPacket,
  ResultSetHeader,
  OkPacket,
} from "mysql2/promise"

// Create a connection pool
const pool: Pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "swetha@2005",
  database: process.env.MYSQL_DATABASE || "spark_life_connect",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Execute a SELECT query and return rows
export async function query(
  sql: string,
  params?: any[]
): Promise<RowDataPacket[]> {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(sql, params)
    return rows
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Get a single row
export async function queryOne(
  sql: string,
  params?: any[]
): Promise<RowDataPacket | null> {
  const rows = await query(sql, params)
  return rows.length > 0 ? rows[0] : null
}

// Insert and return the inserted ID
export async function insert(
  sql: string,
  params?: any[]
): Promise<number> {
  try {
    const [result] = await pool.execute<ResultSetHeader>(sql, params)
    return result.insertId
  } catch (error) {
    console.error("Database insert error:", error)
    throw error
  }
}

// Execute non-select query and return affected rows
export async function execute(
  sql: string,
  params?: any[]
): Promise<number> {
  try {
    const [result] = await pool.execute<ResultSetHeader>(sql, params)
    return result.affectedRows
  } catch (error) {
    console.error("Database execution error:", error)
    throw error
  }
}
