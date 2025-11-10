import { NextResponse } from "next/server";
import { supabase, DOCUMENTS_TABLE } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const { data, error } = await supabase
      .from(DOCUMENTS_TABLE)
      .select('id, content, metadata, language');
    
    if (error) throw error;
    
    return NextResponse.json({
      documents: data.map(doc => ({
        id: doc.id,
        preview: doc.content.substring(0, 100) + '...',
        filename: doc.metadata?.filename || 'Unknown',
        language: doc.language
      })).reverse(),
      total: data.length
    });
  } catch (error) {
    console.error("Fetch documents error:", error);
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: "Document ID required" },
        { status: 400 }
      );
    }
    
    const { error } = await supabase
      .from(DOCUMENTS_TABLE)
      .delete()
      .eq('id', parseInt(id));
    
    if (error) throw error;
    
    return NextResponse.json({
      success: true,
      message: "Document deleted successfully"
    });
  } catch (error) {
    console.error("Delete document error:", error);
    return NextResponse.json(
      { error: "Failed to delete document" },
      { status: 500 }
    );
  }
}