const express = require("express");
const axios = require("axios");
const router = express.Router();
const { createClient, gql, cacheExchange, fetchExchange} = require('@urql/core');

// Configuration de l'API Chargetrip
const headers = {
    'x-client-id': '6797f471d544a035e3ac2207',
    'x-app-id': '6797f471d544a035e3ac2209',
};


const client = createClient({
    fetchOptions: {
        headers,
        method: 'POST',

    },
    url: 'https://api.chargetrip.io/graphql',
    exchanges: [cacheExchange, fetchExchange],
});

// Requête GraphQL pour la liste des véhicules
const getVehicleListQuery = gql`
  query {
    vehicleList {
      id
      naming {
        model
        make
        chargetrip_version
      }
      media {
        image {
          thumbnail_url
        }
      }
    }
  }
`;

// Requête GraphQL pour les détails d'un véhicule
const getVehicleDetailsQuery = gql`
query vehicle($vehicleId: ID!) {
  vehicle(id: $vehicleId) {
    naming {
      make
      model
      chargetrip_version
    }
    media {
      image {
        url
      }
      brand {
        thumbnail_url
      }
    }
    battery {
      usable_kwh
    }
    range {
      best {
        highway
        city
        combined
      }
      worst {
        highway
        city
        combined
      }
      chargetrip_range {
        best
        worst
      }
    }
    routing {
      fast_charging_support
    }
    connectors {
      standard
      time
      charge_speed
    }
    performance {
      acceleration
      top_speed
    }
  }
}
`;

// Route pour récupérer la liste des véhicules
router.get('/cars', async (req, res) => {
    try {
        const response = await client.query(getVehicleListQuery).toPromise();
        res.json(response.data.vehicleList);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching vehicle list' });
    }
});

// Route pour récupérer les détails d'un véhicule
router.get('/carsd', async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ error: "Le paramètre 'id' est requis." });
        }

        const response = await client.query(getVehicleDetailsQuery, { vehicleId: id }).toPromise();
        if (response.error) throw new Error(response.error.message);

        res.json(response.data);
    } catch (error) {
        console.error("GraphQL Error:", error);
        res.status(500).json({ error: 'Error fetching vehicle details' });
    }
});

module.exports = router;

