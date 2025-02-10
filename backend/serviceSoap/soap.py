from spyne import Application, rpc, ServiceBase, Float, Integer
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication
from wsgiref.simple_server import make_server

class TravelTimeService(ServiceBase):
    @rpc(Float, Float, Float, Float, Float, _returns=(Float, Integer))
    def calculate_travel_time(ctx, total_distance, avg_speed, usable_kwh, consumption, time_charging):
        """
        Calcule le temps total du trajet et le nombre de recharges nécessaires.
        """

        consumption_kwh = consumption / 1000  # Convertit en kWh/km

        total_distance = total_distance/1000

        # Calcul du temps de conduite
        drive_time = total_distance / avg_speed  # en heures

        #Calcul de l'autonomie par recharge
        range_per_charge = (usable_kwh / consumption_kwh)  # Suppression du * 100

        #Calcul du nombre de recharges nécessaires (arrondi au supérieur)
        recharge_count = -(-total_distance // range_per_charge)  # équivalent à math.ceil()

        #Calcul du temps total de recharge
        charge_time_per_stop = time_charging
        total_charge_time = recharge_count * charge_time_per_stop  # en heures

        #Calcul du temps total du trajet
        total_time = drive_time + total_charge_time

        return total_time, int(recharge_count)  # Retourne un tuple (temps total, recharges nécessaires)

# Définition de l'application SOAP
application = Application(
    [TravelTimeService],
    tns="spyne.examples.traveltime",
    in_protocol=Soap11(validator='lxml'),
    out_protocol=Soap11()
)

# Création du serveur WSGI
wsgi_app = WsgiApplication(application)
server = make_server('0.0.0.0', 8033, wsgi_app)
print("Service SOAP en écoute sur http://localhost:8033")
server.serve_forever()
