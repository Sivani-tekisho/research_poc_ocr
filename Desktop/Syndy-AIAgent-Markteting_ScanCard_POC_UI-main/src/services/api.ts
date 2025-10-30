import type { UploadCardResponse, ScheduleMeetingResponse, BusinessCardData, UserInfo } from '../types/cardScanner';

const API_BASE_URL = 'http://localhost:8000';
const MOCK_MODE = true; // Set to false when backend is available

export class CardScannerAPI {
  /**
   * Upload and process business card image
   */
  static async uploadCard(imageFile: File): Promise<UploadCardResponse> {
    // Validation
    if (!imageFile) {
      throw new Error('No file provided');
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(imageFile.type)) {
      throw new Error(`Invalid file type. Please upload a JPEG or PNG image.`);
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (imageFile.size > maxSize) {
      throw new Error(`File size exceeds 10MB limit.`);
    }

    // Mock mode - return fake transaction ID
    if (MOCK_MODE) {
      console.log('🔧 Mock mode: Simulating card upload');
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate upload time
      
      const mockTransactionId = `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      return {
        status: 200,
        message: "User Card Image is stored and being processed",
        transactionID: mockTransactionId
      };
    }

    const formData = new FormData();
    formData.append('file', imageFile, imageFile.name);
    
    console.log('📤 Uploading card image:', imageFile.name, imageFile.type, `${(imageFile.size / 1024).toFixed(2)}KB`);

    const response = await fetch(`${API_BASE_URL}/api/persistNprocessCapturedCard`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Upload error:', response.status, errorText);
      
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.detail || `Upload failed: ${response.status}`);
      } catch {
        throw new Error(`Upload failed (${response.status}): ${errorText}`);
      }
    }
    
    const result = await response.json();
    console.log('✅ Upload successful:', result);
    return result;
  }

  /**
   * Upload selfie image for a transaction
   */
  static async uploadSelfie(transactionID: string, selfieFile: File): Promise<any> {
    // Validation
    if (!selfieFile) {
      throw new Error('No selfie file provided');
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(selfieFile.type)) {
      throw new Error(`Invalid file type. Please upload a JPEG or PNG image.`);
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (selfieFile.size > maxSize) {
      throw new Error(`File size exceeds 10MB limit.`);
    }

    // Mock mode - return fake selfie upload success
    if (MOCK_MODE) {
      console.log('🔧 Mock mode: Simulating selfie upload');
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate upload time
      
      return {
        status: 200,
        message: "Selfie uploaded successfully",
        transactionID: transactionID
      };
    }

    const formData = new FormData();
    formData.append('selfie', selfieFile, selfieFile.name);
    formData.append('transactionID', transactionID);
    
    console.log('📤 Uploading selfie:', selfieFile.name, selfieFile.type, `${(selfieFile.size / 1024).toFixed(2)}KB`);

    const response = await fetch(`${API_BASE_URL}/api/transactions/${transactionID}/selfie`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Selfie upload error:', response.status, errorText);
      
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.detail || `Selfie upload failed: ${response.status}`);
      } catch {
        throw new Error(`Selfie upload failed (${response.status}): ${errorText}`);
      }
    }
    
    const result = await response.json();
    console.log('✅ Selfie upload successful:', result);
    return result;
  }

  /**
   * Schedule a meeting for a contact
   */
  static async scheduleMeeting(transactionID: string): Promise<ScheduleMeetingResponse> {
    // Mock mode - return fake meeting scheduling success
    if (MOCK_MODE) {
      console.log('🔧 Mock mode: Simulating meeting scheduling');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing time
      
      return {
        status: 200,
        message: "Meeting Invitation request is Received",
        transactionID: transactionID
      };
    }

    const response = await fetch(`${API_BASE_URL}/api/intiateMeetingScheduler`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        transactionID, 
        isMeetingRequested: true 
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to schedule meeting: ${response.status}`);
    }
    
    return response.json();
  }

  /**
   * Check processing status of a card
   */
  static async checkProcessingStatus(transactionID: string): Promise<BusinessCardData> {
    // Mock mode - return fake processing completion
    if (MOCK_MODE) {
      console.log('🔧 Mock mode: Returning completed processing status');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing time
      
      return {
        transaction_id: transactionID,
        image_url: null,
        processing_status: 'completed',
        llm_response: {
          extracted_data: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1-555-0123',
            company: 'Example Corp',
            title: 'Senior Developer',
          },
          confidence_score: 0.95,
          processing_time_ms: 2500
        }
      };
    }

    const response = await fetch(`${API_BASE_URL}/api/checkCardStatus/${transactionID}`, {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to check status: ${response.status}`);
    }
    
    return response.json();
  }

  /**
   * Fetch extracted user info
   */
  static async getUserInfo(transactionID: string): Promise<UserInfo> {
    // Mock mode - return fake data when backend is not available
    if (MOCK_MODE) {
      console.log('🔧 Mock mode: Returning mock user info');
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      return {
        transaction_id: transactionID,
        email: null,
        name: null,
        phone: null,
        company: null,
        is_meeting_requested: false,
        created_at: new Date().toISOString(),
      };
    }

    const response = await fetch(`${API_BASE_URL}/api/getUserInfo/${transactionID}`, {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.status}`);
    }
    
    const result = await response.json();
    
    console.log('📥 Raw getUserInfo response:', result);
    
    // Backend returns: { status: 200, transactionID: "...", data: {...}, exists: true }
    // Extract the nested data object
    if (result.data) {
      console.log('✅ Extracted user data:', result.data);
      return {
        transaction_id: result.transactionID || result.data.transaction_id,
        email: result.data.email || null,
        name: result.data.name || null,
        phone: result.data.phone || null,
        company: result.data.company || null,
        is_meeting_requested: result.data.is_meeting_requested || false,
        created_at: result.data.created_at,
      };
    }
    
    // Fallback if data structure is different
    console.warn('⚠️ Unexpected response structure, using result directly');
    return result;
  }
}
