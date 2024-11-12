import z from "zod";

export const signUpTypes = z.object({
  username: z.string(),
  password: z.string(),
  type: z.string(),
});

export const signInTypes = z.object({
  username: z.string(),
  password: z.string(),
});

export const metadataType = z.object({
  avatarId: z.string(),
});

export const createSpaceType = z.object({
  name: z.string(),
  dimensions: z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
  mapId: z.string(),
});

export const addElementType = z.object({
  elementId: z.string(),
  spaceId: z.string(),
  x: z.number(),
  y: z.number(),
});

export const addMapElementType = z.object({
  imageUrl: z.string(),
  width: z.number(),
  height: z.number(),
  static: z.boolean(),
});
export const updateElement = z.object({
  imageUrl: z.string(),
});
export const createAvatarType = z.object({
  imageUrl: z.string(),
  name: z.string(),
});
export const createMapType = z.object({
  thumbnail: z.string(),
  dimensions: z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
  name: z.string(),
  defaultElements: z.array(
    z.object({
      elementId: z.string(),
      x: z.number(),
      y: z.number(),
    })
  ),
});
