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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      buyers: {
        Row: {
          business_type: string
          company_name: string
          created_at: string
          id: string
          location: string
          minimum_order_kg: number | null
          phone_number: string
          preferred_crops: string[] | null
          updated_at: string
          user_id: string
          verification_status: string | null
        }
        Insert: {
          business_type: string
          company_name: string
          created_at?: string
          id?: string
          location: string
          minimum_order_kg?: number | null
          phone_number: string
          preferred_crops?: string[] | null
          updated_at?: string
          user_id: string
          verification_status?: string | null
        }
        Update: {
          business_type?: string
          company_name?: string
          created_at?: string
          id?: string
          location?: string
          minimum_order_kg?: number | null
          phone_number?: string
          preferred_crops?: string[] | null
          updated_at?: string
          user_id?: string
          verification_status?: string | null
        }
        Relationships: []
      }
      crop_listings: {
        Row: {
          available_from: string
          available_until: string | null
          created_at: string
          crop_name: string
          description: string | null
          farmer_id: string
          harvest_date: string | null
          id: string
          is_available: boolean | null
          is_organic: boolean | null
          location: string
          price_per_kg: number
          quantity_kg: number
          updated_at: string
        }
        Insert: {
          available_from?: string
          available_until?: string | null
          created_at?: string
          crop_name: string
          description?: string | null
          farmer_id: string
          harvest_date?: string | null
          id?: string
          is_available?: boolean | null
          is_organic?: boolean | null
          location: string
          price_per_kg: number
          quantity_kg: number
          updated_at?: string
        }
        Update: {
          available_from?: string
          available_until?: string | null
          created_at?: string
          crop_name?: string
          description?: string | null
          farmer_id?: string
          harvest_date?: string | null
          id?: string
          is_available?: boolean | null
          is_organic?: boolean | null
          location?: string
          price_per_kg?: number
          quantity_kg?: number
          updated_at?: string
        }
        Relationships: []
      }
      market_prices: {
        Row: {
          created_at: string
          crop_name: string
          date: string
          id: string
          location: string
          market_name: string
          price_per_kg: number
          source: string | null
        }
        Insert: {
          created_at?: string
          crop_name: string
          date?: string
          id?: string
          location: string
          market_name: string
          price_per_kg: number
          source?: string | null
        }
        Update: {
          created_at?: string
          crop_name?: string
          date?: string
          id?: string
          location?: string
          market_name?: string
          price_per_kg?: number
          source?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean | null
          order_id: string | null
          recipient_id: string
          sender_id: string
          subject: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          order_id?: string | null
          recipient_id: string
          sender_id: string
          subject?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          order_id?: string | null
          recipient_id?: string
          sender_id?: string
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      mpesa_transactions: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: string
          mpesa_receipt_number: string | null
          phone_number: string
          reference: string | null
          status: string | null
          transaction_date: string | null
          transaction_id: string
          transaction_type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id?: string
          mpesa_receipt_number?: string | null
          phone_number: string
          reference?: string | null
          status?: string | null
          transaction_date?: string | null
          transaction_id: string
          transaction_type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: string
          mpesa_receipt_number?: string | null
          phone_number?: string
          reference?: string | null
          status?: string | null
          transaction_date?: string | null
          transaction_id?: string
          transaction_type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          buyer_id: string
          created_at: string
          delivery_date: string | null
          delivery_location: string | null
          farmer_id: string
          id: string
          listing_id: string
          mpesa_transaction_id: string | null
          notes: string | null
          payment_method: string | null
          payment_status: string | null
          quantity_kg: number
          status: string | null
          total_amount: number
          updated_at: string
        }
        Insert: {
          buyer_id: string
          created_at?: string
          delivery_date?: string | null
          delivery_location?: string | null
          farmer_id: string
          id?: string
          listing_id: string
          mpesa_transaction_id?: string | null
          notes?: string | null
          payment_method?: string | null
          payment_status?: string | null
          quantity_kg: number
          status?: string | null
          total_amount: number
          updated_at?: string
        }
        Update: {
          buyer_id?: string
          created_at?: string
          delivery_date?: string | null
          delivery_location?: string | null
          farmer_id?: string
          id?: string
          listing_id?: string
          mpesa_transaction_id?: string | null
          notes?: string | null
          payment_method?: string | null
          payment_status?: string | null
          quantity_kg?: number
          status?: string | null
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "buyers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "crop_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      price_alerts: {
        Row: {
          created_at: string
          crop_name: string
          id: string
          is_active: boolean | null
          location: string | null
          target_price: number
          user_id: string
        }
        Insert: {
          created_at?: string
          crop_name: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          target_price: number
          user_id: string
        }
        Update: {
          created_at?: string
          crop_name?: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          target_price?: number
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          county: string | null
          created_at: string | null
          farm_size_acres: number | null
          full_name: string | null
          id: string
          mpesa_phone_number: string | null
          phone_number: string | null
          primary_crops: string[] | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          county?: string | null
          created_at?: string | null
          farm_size_acres?: number | null
          full_name?: string | null
          id: string
          mpesa_phone_number?: string | null
          phone_number?: string | null
          primary_crops?: string[] | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          county?: string | null
          created_at?: string | null
          farm_size_acres?: number | null
          full_name?: string | null
          id?: string
          mpesa_phone_number?: string | null
          phone_number?: string | null
          primary_crops?: string[] | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      business_profiles: {
        Row: {
          county: string | null
          created_at: string | null
          farm_size_acres: number | null
          full_name: string | null
          id: string | null
          primary_crops: string[] | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          county?: string | null
          created_at?: string | null
          farm_size_acres?: number | null
          full_name?: string | null
          id?: string | null
          primary_crops?: string[] | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          county?: string | null
          created_at?: string | null
          farm_size_acres?: number | null
          full_name?: string | null
          id?: string | null
          primary_crops?: string[] | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_user_active_orders: {
        Args: { check_user_id: string }
        Returns: {
          buyer_user_id: string
          farmer_id: string
        }[]
      }
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
