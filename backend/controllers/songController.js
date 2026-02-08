import axios from "axios"

const getSongs=async(req,res)=>{
    try {
        const response = await axios.get(
            `https://api.jamendo.com/v3.0/tracks/?client_id=a01b6815&format=jsonpretty&limit=15`
        );
        const data =response.data;
        res.status(200).json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message:error.message});
    }
};

const getPlaylistByTag = async (req, res) => {
  try {
    const { tag } = req.params;

    if (!tag || !tag.trim()) {
      return res.status(400).json({ message: "Missing tag parameter" });
    }

    const limit = parseInt(req.query.limit ?? "10", 10);

    const params = {
      client_id: process.env.JAMENDO_CLIENT_ID,
      format: "json",
      tags: tag.trim(),

      // 🔥 REQUIRED FOR AUDIO
      audioformat: "mp32",
      include: "musicinfo",
      order: "popularity_total",

      limit,
    };

    const response = await axios.get(
      "https://api.jamendo.com/v3.0/tracks",
      { params }
    );

    return res.status(200).json({
      results: response.data?.results || [],
    });
  } catch (error) {
    console.error(
      "getPlaylistByTag error:",
      error?.response?.data || error.message
    );

    return res.status(500).json({ message: "Failed to fetch playlist" });
  }
};

const toggleFavourite=async(req,res)=>{
    try {
        const user=req.user;
    const song=req.body.song;

    const exists=user.favourites.find((fav)=>fav.id === song.id);

    if(exists){
        user.favourites=user.favourites.filter((fav)=>fav.id !=song.id);  
    }else{
        user.favourites.push(song);
    }

    await user.save();

    return res.status(200).json(user.favourites);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({message:"Favourites not added something went wrong"});
    }
};

export {getSongs, getPlaylistByTag , toggleFavourite};