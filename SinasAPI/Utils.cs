namespace SinasAPI
{
    public static class Utils
    {
        public static async Task<string> StreamToString(Stream stream)
        {
            using (StreamReader reader = new StreamReader(stream)) return await reader.ReadToEndAsync();
        }
    }
    
}