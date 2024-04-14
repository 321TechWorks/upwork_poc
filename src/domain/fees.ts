export const licenseFees = {
  DOG: {
    "Dangerous Dog": 300.0,
    Intact: 16.0,
    "Service Dog": 0.0, // Must verify with BCSO Animal Services
    "Spayed/Neutered": 10.0,
    "Under 1 Year": 10.0,
  },
  CAT: {
    Intact: 16.0,
    "Spayed/Neutered": 10.0,
    "Under 1 Year": 10.0,
  },
  FERRET: {
    Intact: 16.0,
    "Spayed/Neutered": 10.0,
    "Under 1 Year": 10.0,
  },
} as const;
