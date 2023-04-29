

# Actuatuor-Control-Frontend

This project is developed as the forntend web app for the Actuatuor-Control-Backend project. Together, they allow a Raspberry pi to be connected to a linear actuator (or any DC motor) and then control this actuator state (drive, reverse or stop) through this app hosted on the RasPi itself.

## Genearal Steps:

- Make sure that your RasPi can run as an HTTP server (Tested with Nginx).
- Make sure that your RasPi has MariaDB server installed and running and can handle PHP.
- Build and host this frontend app to the root of your Pi and access it through the IP address of the Pi on the same network as your phone or PC.
- Host the backend to the same Pi and make sure to make any nesessary adjustments to ensure that the Frontend app connects to the location of the backend on the Pi.
- Also make sure the backend connects to the proper DB location with the proper credentials (Found in the [backend project](https://github.com/WaelKYoussef/Actuatuor-Control-Backend) itself).
- The connection guide between the Raspi, relays and linear actuator are in the [backend project](https://github.com/WaelKYoussef/Actuatuor-Control-Backend) repo.
