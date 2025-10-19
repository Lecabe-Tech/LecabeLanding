import type { ApiResponse } from '@/types'

/**
 * Base API configuration
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

/**
 * HTTP methods enum
 */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

/**
 * Request configuration interface
 */
interface RequestConfig {
  method?: HttpMethod
  headers?: HeadersInit
  body?: unknown
}

/**
 * API Service class following SOLID principles
 * Handles all HTTP requests to the backend API
 */
class ApiService {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  /**
   * Get the full URL for an endpoint
   * @param endpoint - API endpoint path
   * @returns Full URL string
   */
  private getUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`
  }

  /**
   * Get default headers for requests
   * @returns Headers object
   */
  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json'
    }
  }

  /**
   * Make an HTTP request to the API
   * @param endpoint - API endpoint path
   * @param config - Request configuration
   * @returns Promise with the response data
   */
  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { method = HttpMethod.GET, headers, body } = config

    const mergedHeaders = { ...this.getHeaders(), ...(headers || {}) }
    
    const requestOptions: RequestInit = {
      method,
      headers: mergedHeaders
    }

    if (body) {
      requestOptions.body = JSON.stringify(body)
    }

    try {
      const response = await fetch(this.getUrl(endpoint), requestOptions)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  /**
   * Perform GET request
   * @param endpoint - API endpoint path
   * @returns Promise with the response data
   */
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<ApiResponse<T>>(endpoint, { method: HttpMethod.GET })
  }

  /**
   * Perform POST request
   * @param endpoint - API endpoint path
   * @param data - Request body data
   * @returns Promise with the response data
   */
  async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<ApiResponse<T>>(endpoint, {
      method: HttpMethod.POST,
      body: data
    })
  }

  /**
   * Perform PUT request
   * @param endpoint - API endpoint path
   * @param data - Request body data
   * @returns Promise with the response data
   */
  async put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<ApiResponse<T>>(endpoint, {
      method: HttpMethod.PUT,
      body: data
    })
  }

  /**
   * Perform PATCH request
   * @param endpoint - API endpoint path
   * @param data - Request body data
   * @returns Promise with the response data
   */
  async patch<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<ApiResponse<T>>(endpoint, {
      method: HttpMethod.PATCH,
      body: data
    })
  }

  /**
   * Perform DELETE request
   * @param endpoint - API endpoint path
   * @returns Promise with the response data
   */
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<ApiResponse<T>>(endpoint, { method: HttpMethod.DELETE })
  }
}

// Export singleton instance
export const api = new ApiService(API_BASE_URL)

export default api

