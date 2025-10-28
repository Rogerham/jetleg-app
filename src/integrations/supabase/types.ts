export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      alert_preferences: {
        Row: {
          created_at: string
          email_address: string | null
          email_notifications: boolean | null
          id: string
          phone_notifications: boolean | null
          phone_number: string | null
          saved_search_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email_address?: string | null
          email_notifications?: boolean | null
          id?: string
          phone_notifications?: boolean | null
          phone_number?: string | null
          saved_search_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email_address?: string | null
          email_notifications?: boolean | null
          id?: string
          phone_notifications?: boolean | null
          phone_number?: string | null
          saved_search_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "alert_preferences_saved_search_id_fkey"
            columns: ["saved_search_id"]
            isOneToOne: false
            referencedRelation: "saved_searches"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          booking_status: string
          created_at: string
          flight_id: string
          id: string
          passenger_count: number
          passenger_details: Json | null
          payment_details: Json | null
          total_price: number
          updated_at: string
          user_id: string
        }
        Insert: {
          booking_status?: string
          created_at?: string
          flight_id: string
          id?: string
          passenger_count?: number
          passenger_details?: Json | null
          payment_details?: Json | null
          total_price: number
          updated_at?: string
          user_id: string
        }
        Update: {
          booking_status?: string
          created_at?: string
          flight_id?: string
          id?: string
          passenger_count?: number
          passenger_details?: Json | null
          payment_details?: Json | null
          total_price?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_flight_id_fkey"
            columns: ["flight_id"]
            isOneToOne: false
            referencedRelation: "flights"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_bookings_flight_id"
            columns: ["flight_id"]
            isOneToOne: false
            referencedRelation: "flights"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_bookings_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      flights: {
        Row: {
          arrival_airport: string
          arrival_time: string
          available_seats: number
          created_at: string
          departure_airport: string
          departure_time: string
          flight_duration: string
          id: string
          img_destination: string | null
          jet_id: number | null
          operator: string
          price_per_seat: number
        }
        Insert: {
          arrival_airport: string
          arrival_time: string
          available_seats?: number
          created_at?: string
          departure_airport: string
          departure_time: string
          flight_duration: string
          id?: string
          img_destination?: string | null
          jet_id?: number | null
          operator: string
          price_per_seat: number
        }
        Update: {
          arrival_airport?: string
          arrival_time?: string
          available_seats?: number
          created_at?: string
          departure_airport?: string
          departure_time?: string
          flight_duration?: string
          id?: string
          img_destination?: string | null
          jet_id?: number | null
          operator?: string
          price_per_seat?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_flights_jet_id"
            columns: ["jet_id"]
            isOneToOne: false
            referencedRelation: "jets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flights_jet_id_fkey"
            columns: ["jet_id"]
            isOneToOne: false
            referencedRelation: "jets"
            referencedColumns: ["id"]
          },
        ]
      }
      jets: {
        Row: {
          brand: string
          created_at: string | null
          description: string | null
          id: number
          image_url: string | null
          model: string | null
          range_km: number | null
          seating_capacity: number | null
          type: string | null
        }
        Insert: {
          brand: string
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          model?: string | null
          range_km?: number | null
          seating_capacity?: number | null
          type?: string | null
        }
        Update: {
          brand?: string
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          model?: string | null
          range_km?: number | null
          seating_capacity?: number | null
          type?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      saved_searches: {
        Row: {
          created_at: string
          id: string
          search_criteria: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          search_criteria: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          search_criteria?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          created_at: string
          currency: string
          dark_mode: boolean
          id: string
          language: string
          notifications: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          currency?: string
          dark_mode?: boolean
          id?: string
          language?: string
          notifications?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          currency?: string
          dark_mode?: boolean
          id?: string
          language?: string
          notifications?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
