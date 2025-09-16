import React, { useState } from "react";

export default function GetFlightDetails() {

    const [flights, setFlights] = useState([
        {
            airlineName: "Emirates",
            airlineLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/2560px-Emirates_logo.svg.png",
            fromLocation: "Dubai International Airport (DXB)",
            toLocation: "John F. Kennedy International Airport (JFK)",
            price: 48500,
            duration: 780,
            departureTime: "22:30",
            arrivalTime: "05:30+1",
        },
        {
            airlineName: "Singapore Airlines",
            airlineLogo: "https://1000logos.net/wp-content/uploads/2020/04/Singapore-Airlines-Logo.png",
            fromLocation: "Changi Airport (SIN)",
            toLocation: "Heathrow Airport (LHR)",
            price: 52000,
            duration: 840,
            departureTime: "23:55",
            arrivalTime: "06:15+1",
        },
        {
            airlineName: "Qatar Airways",
            airlineLogo: "https://cdn.brandfetch.io/idZKewuK9S/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1721652929493",
            fromLocation: "Hamad International Airport (DOH)",
            toLocation: "Charles de Gaulle Airport (CDG)",
            price: 43500,
            duration: 720,
            departureTime: "08:15",
            arrivalTime: "13:15",
        },
        {
            airlineName: "IndiGo",
            airlineLogo: "https://airhex.com/images/airline-logos/alt/indigo.png",
            fromLocation: "Cochin International Airport (COK)",
            toLocation: "Kempegowda International Airport (BLR)",
            price: 3200,
            duration: 70,
            departureTime: "06:30",
            arrivalTime: "07:40",
        },
        {
            airlineName: "Air India",
            airlineLogo: "https://cdn.brandfetch.io/id-PSmaCm4/theme/light/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1715867951334",
            fromLocation: "Indira Gandhi International Airport (DEL)",
            toLocation: "Chhatrapati Shivaji Maharaj International Airport (BOM)",
            price: 4500,
            duration: 125,
            departureTime: "09:00",
            arrivalTime: "11:05",
        },
        {
            airlineName: "SpiceJet",
            airlineLogo: "https://cdn.brandfetch.io/id0DNBaeFO/w/800/h/216/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1667566908963",
            fromLocation: "Rajiv Gandhi International Airport (HYD)",
            toLocation: "Netaji Subhas Chandra Bose International Airport (CCU)",
            price: 3800,
            duration: 135,
            departureTime: "14:20",
            arrivalTime: "16:35",
        }
    ]);


    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [airlineFilter, setAirlineFilter] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");



// mins to hrs for displaying
    const formatDuration = (minutes) => {
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hrs}h ${mins}m`;
    };

    // Sorting logic
    const sortedFlights = [...flights].sort((a, b) => {
        if (!sortField) return 0;
        if (sortOrder === "asc") {
            return a[sortField] > b[sortField] ? 1 : -1;
        } else {
            return a[sortField] < b[sortField] ? 1 : -1;
        }
    });

    // Filtering 
    const filteredFlights = sortedFlights.filter((flight) => {
        const matchesAirline = airlineFilter
            ? flight.airlineName.toLowerCase().includes(airlineFilter.toLowerCase())
            : true;
        const withinMin = minPrice ? flight.price >= Number(minPrice) : true;
        const withinMax = maxPrice ? flight.price <= Number(maxPrice) : true;
        return matchesAirline && withinMin && withinMax;
    });

    return (
        <div className="p-5 font-sans max-w-6xl mx-auto">
            
            <div className="sticky top-0 bg-white z-10 py-4 mb-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    {/* Header */}
                    <h1 className="text-3xl font-bold text-gray-800">Flight Data Application</h1>

                    {/* Sort element */}
                    <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-auto">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Sort Flights</h3>

                        <div className="flex flex-wrap items-center gap-2">
                            <select
                                value={sortField}
                                onChange={(e) => setSortField(e.target.value)}
                                className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="" disabled>Sort By</option>
                                <option value="airlineName">Airline Name</option>
                                <option value="price">Price</option>
                                <option value="departureTime">Departure Time</option>
                                <option value="duration">Duration</option>
                            </select>

                            <select
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>

                        {sortField === "airlineName" && (
                            <div className="mt-3">
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">Filter by Airline Name</h3>
                                <input
                                    type="text"
                                    placeholder="Enter Airline Name"
                                    value={airlineFilter}
                                    onChange={(e) => setAirlineFilter(e.target.value)}
                                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
                                />
                            </div>
                        )}

                        {sortField === "price" && (
                            <div className="mt-3">
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">Filter by Price</h3>
                                <div className="flex flex-wrap gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min Price"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max Price"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* body */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Flights</h2>

            {filteredFlights.length > 0 ? (
                <div className="space-y-4">
                    {filteredFlights.map((flight, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="flex flex-col md:flex-row md:items-center">
                                <div className="flex items-center mb-4 md:mb-0 md:w-1/4">
                                    <img
                                        src={flight.airlineLogo}
                                        alt={flight.airlineName}
                                        className="w-16 h-16 object-contain mr-4"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800">{flight.airlineName}</p>
                                        <p className="text-gray-600">{flight.fromLocation} {flight.toLocation}</p>
                                    </div>
                                </div>

                                <div className="md:w-1/4 mb-4 md:mb-0">
                                    <p className="text-gray-600">Departure: <span className="font-medium">{flight.departureTime}</span></p>
                                    <p className="text-gray-600">Arrival: <span className="font-medium">{flight.arrivalTime}</span></p>
                                </div>

                                <div className="md:w-1/4 mb-4 md:mb-0">
                                    <p className="text-gray-600">Duration: <span className="font-medium">{formatDuration(flight.duration)}</span></p>
                                </div>

                                <div className="md:w-1/4">
                                    <p className="text-2xl font-bold text-blue-600">₹{flight.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <p className="text-gray-600 text-lg">No flights.</p>
                </div>
            )}
        </div>
    );
}
