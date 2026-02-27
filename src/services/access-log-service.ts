export interface AccessLog {
  id: string;
  user: string;
  email: string;
  loginTime: string;
  logoutTime: string | null;
  ipAddress: string;
  status: "Success" | "Failed";
}

export interface AccessLogResponse {
  success: boolean;
  message: string;
  data: AccessLog[];
}

const mockAccessLogs: AccessLog[] = [
  {
    id: "1",
    user: "John Doe",
    email: "john.doe@example.com",
    loginTime: "2026-02-27T08:30:00Z",
    logoutTime: "2026-02-27T17:00:00Z",
    ipAddress: "192.168.1.100",
    status: "Success",
  },
  {
    id: "2",
    user: "Jane Smith",
    email: "jane.smith@example.com",
    loginTime: "2026-02-27T09:15:00Z",
    logoutTime: null,
    ipAddress: "192.168.1.102",
    status: "Success",
  },
  {
    id: "3",
    user: "Admin User",
    email: "admin@epoverse.com",
    loginTime: "2026-02-27T10:00:00Z",
    logoutTime: "2026-02-27T10:30:00Z",
    ipAddress: "10.0.0.5",
    status: "Success",
  },
  {
    id: "4",
    user: "Unknown",
    email: "hacker@malicious.com",
    loginTime: "2026-02-27T11:45:00Z",
    logoutTime: null,
    ipAddress: "203.0.113.42",
    status: "Failed",
  },
  {
    id: "5",
    user: "Alice Johnson",
    email: "alice@example.com",
    loginTime: "2026-02-26T14:20:00Z",
    logoutTime: "2026-02-26T18:10:00Z",
    ipAddress: "192.168.1.104",
    status: "Success",
  }
];

export const accessLogService = {
  /**
   * Fetch all access logs
   */
  getLogs: async (): Promise<AccessLog[]> => {
    // Simulating API call latency
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockAccessLogs]); // Return a copy
      }, 500);
    });
  }
};
