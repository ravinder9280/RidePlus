export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Relationships: [];
      };
      ride_chats: {
        Row: {
          createdAt: string;
          id: string;
          isActive: boolean;
          rideId: string;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          id: string;
          isActive?: boolean;
          rideId: string;
          updatedAt: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          isActive?: boolean;
          rideId?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ride_chats_rideId_fkey";
            columns: ["rideId"];
            isOneToOne: false;
            referencedRelation: "rides";
            referencedColumns: ["id"];
          },
        ];
      };
      ride_embeddings: {
        Row: {
          createdAt: string;
          embedding: string;
          rideId: string;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          embedding: string;
          rideId: string;
          updatedAt: string;
        };
        Update: {
          createdAt?: string;
          embedding?: string;
          rideId?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ride_embeddings_rideId_fkey";
            columns: ["rideId"];
            isOneToOne: true;
            referencedRelation: "rides";
            referencedColumns: ["id"];
          },
        ];
      };
      ride_members: {
        Row: {
          canonicalText: string | null;
          createdAt: string;
          fareShare: number;
          id: string;
          rideId: string;
          seatsRequested: number;
          status: Database["public"]["Enums"]["MemberStatus"];
          updatedAt: string;
          userId: string;
        };
        Insert: {
          canonicalText?: string | null;
          createdAt?: string;
          fareShare: number;
          id: string;
          rideId: string;
          seatsRequested?: number;
          status?: Database["public"]["Enums"]["MemberStatus"];
          updatedAt: string;
          userId: string;
        };
        Update: {
          canonicalText?: string | null;
          createdAt?: string;
          fareShare?: number;
          id?: string;
          rideId?: string;
          seatsRequested?: number;
          status?: Database["public"]["Enums"]["MemberStatus"];
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ride_members_rideId_fkey";
            columns: ["rideId"];
            isOneToOne: false;
            referencedRelation: "rides";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ride_members_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      ride_messages: {
        Row: {
          chatId: string;
          content: string;
          createdAt: string;
          id: string;
          isRead: boolean;
          senderId: string;
          updatedAt: string;
        };
        Insert: {
          chatId: string;
          content: string;
          createdAt?: string;
          id: string;
          isRead?: boolean;
          senderId: string;
          updatedAt: string;
        };
        Update: {
          chatId?: string;
          content?: string;
          createdAt?: string;
          id?: string;
          isRead?: boolean;
          senderId?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ride_messages_chatId_fkey";
            columns: ["chatId"];
            isOneToOne: false;
            referencedRelation: "ride_chats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ride_messages_senderId_fkey";
            columns: ["senderId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      rides: {
        Row: {
          canonicalText: string | null;
          createdAt: string;
          departureAt: string;
          estTotalFare: number;
          fromLat: number;
          fromLng: number;
          fromText: string;
          id: string;
          isVerified: boolean;
          ownerId: string;
          perSeatPrice: number;
          seatsAvailable: number;
          seatsTotal: number;
          service: Database["public"]["Enums"]["RideService"];
          shareUrlEnc: string | null;
          shareUrlHash: string | null;
          status: Database["public"]["Enums"]["RideStatus"];
          toLat: number;
          toLng: number;
          toText: string;
          updatedAt: string;
        };
        Insert: {
          canonicalText?: string | null;
          createdAt?: string;
          departureAt: string;
          estTotalFare: number;
          fromLat: number;
          fromLng: number;
          fromText: string;
          id: string;
          isVerified?: boolean;
          ownerId: string;
          perSeatPrice: number;
          seatsAvailable: number;
          seatsTotal: number;
          service: Database["public"]["Enums"]["RideService"];
          shareUrlEnc?: string | null;
          shareUrlHash?: string | null;
          status?: Database["public"]["Enums"]["RideStatus"];
          toLat: number;
          toLng: number;
          toText: string;
          updatedAt: string;
        };
        Update: {
          canonicalText?: string | null;
          createdAt?: string;
          departureAt?: string;
          estTotalFare?: number;
          fromLat?: number;
          fromLng?: number;
          fromText?: string;
          id?: string;
          isVerified?: boolean;
          ownerId?: string;
          perSeatPrice?: number;
          seatsAvailable?: number;
          seatsTotal?: number;
          service?: Database["public"]["Enums"]["RideService"];
          shareUrlEnc?: string | null;
          shareUrlHash?: string | null;
          status?: Database["public"]["Enums"]["RideStatus"];
          toLat?: number;
          toLng?: number;
          toText?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "rides_ownerId_fkey";
            columns: ["ownerId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          clerkId: string;
          email: string | null;
          firstName: string | null;
          id: string;
          imageUrl: string | null;
          lastName: string | null;
          name: string | null;
          phone: string | null;
          rating: number;
        };
        Insert: {
          clerkId: string;
          email?: string | null;
          firstName?: string | null;
          id: string;
          imageUrl?: string | null;
          lastName?: string | null;
          name?: string | null;
          phone?: string | null;
          rating?: number;
        };
        Update: {
          clerkId?: string;
          email?: string | null;
          firstName?: string | null;
          id?: string;
          imageUrl?: string | null;
          lastName?: string | null;
          name?: string | null;
          phone?: string | null;
          rating?: number;
        };
        Relationships: [];
      };
      webhook_event: {
        Row: {
          createdAt: string;
          id: string;
        };
        Insert: {
          createdAt?: string;
          id: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      match_rides: {
        Args: {
          match_count: number;
          match_threshold: number;
          query_embedding: string;
        };
        Returns: {
          departure_at: string;
          from_text: string;
          id: string;
          owner_id: string;
          per_seat_price: number;
          seats_available: number;
          similarity: number;
          to_text: string;
        }[];
      };
    };
    Enums: {
      MemberStatus: "PENDING" | "ACCEPTED" | "DECLINED" | "CANCELLED";
      RideService: "UBER" | "OLA" | "OWNER";
      RideStatus: "ACTIVE" | "COMPLETED" | "CANCELLED";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      MemberStatus: ["PENDING", "ACCEPTED", "DECLINED", "CANCELLED"],
      RideService: ["UBER", "OLA", "OWNER"],
      RideStatus: ["ACTIVE", "COMPLETED", "CANCELLED"],
    },
  },
} as const;
