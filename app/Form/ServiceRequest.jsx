"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns"
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const formSchema = z.object({
  fullName: z.string(),
  preferredDate: z.string().date(),
  date: z.string().date()
})

function ServiceRequestForm() {
  const [serviceSelected, setServiceSelected] = useState("");
  const [pickUp, setPickUp] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
    }
  });
  
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    address: "",
    serviceType: "",
    parameters: [],
    preferredDate: "",
    allottedTo: "",
    date: "",
    remarks: "",
    drawnBy: "",
    pickUp: "",
    confirmation: false,
  });
  const uniqueId = `W001-${Math.floor(Math.random() * 1000)}`

  const serviceRequests = [
    "Water: General Parameters",
    "Water Complete Analysis as per 10500: 2012",
    "Water - Construction Parameters",
    "Water - Microbiological Analysis",
    "Water –Complete Microbiological Analysis",
    "Food Microbiological Parameters",
    "Food Chemical Parameters",
    "Sludge Analysis Parameters",
    "Soil Testing Parameters",
    "Oil - Diesel Testing Parameters",
    "Oil - Nutrition Value + FSSAI Parameters",
    "Coal Analysis Parameters",
    "Effluent Water Analysis Parameters",
    "Sewage Water Chemical Parameters",
    "Ambient Air Quality Monitoring Parameters",
    "DG Stack Emission Parameters",
    "Ambient Noise Monitoring Parameters",
    "DG Noise Monitoring Parameters",
    "Lux Monitoring Parameters",
    "Indoor Air Quality",
    "Compressor Air Monitoring Parameters",
    "Feldspar Analysis Parameter",
    "Quartz Sample Analysis Parameters",
    "Lime Stone Sample Analysis Parameters",
    "Plate - Microbiological Analysis",
    "Swab - Microbiological Analysis",
    "Sewage Water Microbiological Parameters",
    "Weather Monitoring Parameters",
    "Oxygen Purity Parameters" 
  ]

  const staffOptions1 = [
    "Elumalai",
    "Hemavathy",
    "Nalina",
    "Sindhuja",
    "Jeyarani",
    "Nagalakshmi",
  ];

  const staffOptions2 = [
    "Vinaya",
    "Vinitha"
  ]

  const staffOptions3 = [
    "Manimaran",
    "Iliyas"
  ]

  const firstOptions = [
    "Appearance",
    "Colour (Hazen Unit)",
    "Odour",
    "Turbidity (NTU)",
    "EC at 25°C (Micromhos/cm)",
    "pH at 25°C",
    "Total Suspended Solids",
    "Total Dissolved Solids",
    "Phenolphthalein Alkalinity as CaCO₃",
    "Total Alkalinity as CaCO₃",
    "Total Hardness as CaCO₃",
    "Calcium Hardness as CaCO₃",
    "Calcium as Ca",
    "Magnesium Hardness as CaCO₃",
    "Magnesium as Mg",
    "Chlorides as Cl",
    "Sulphates as SO₄",
    "Iron (Total) as Fe",
    "Silica (Reactive) as SiO2",
    "Carbonate Hardness",
    "Non-Carbonate Hardness",
    "Free Residual Chlorine"
  ];

  const secondOptions = [
    "pH value @ 25oC",
    "Color ( Hazen Unit )",
    "Odor",
    "Taste",
    "Turbidity (NTU)",
    "Total Hardness as CaCO3 (mg/l)",
    "Total Iron as Fe(mg/l)",
    "Chlorides as Cl(mg/l)",
    "Free residual chlorine (mg/l)",
    "Total Dissolved Solids (mg/l)",
    "Calcium as Ca (mg/l)",
    "Magnesium as Mg (mg/l)",
    "Copper as Cu (mg/l)",
    "Manganese as Mn(mg/l)",
    "Sulphates as SO4(mg/l)",
    "Nitrate as No3 (mg/l)",
    "Fluoride as F (mg/l)",
    "Phenolic compounds (as C6H5OH) (mg/l)",
    "Mercury as Hg (mg/l)",
    "Cadmium as Cd (mg/l)",
    "Selenium as Se (mg/l)",
    "Arsenic as As (mg/l)",
    "Cyanide as CN( mg/l)",
    "Sulphide as H2S (mg/l)",
    "Lead as Pb (mg/l)",
    "Zinc as Zn (mg/l)",
    "Anionic detergents (as MBAS)(mg/l)",
    "Chromium as Cr6+( mg/l)",
    "Polynuclear aromatic hydrocarbons (asPAH) (mg/l)",
    "PolyChlorinated Biphenyls (mg/l)",
    "Total Alkalinity as CaCO3(mg/l)",
    "Aluminium as Al(mg/l)",
    "Boron as B (mg/l)",
    "Mineral oil (mg/l)",
    "Barium as Ba (mg / l)",
    "Ammonia as NH3(mg/l)",
    "Silver as Ag(mg/l)",
    "Molybdenum (mg/l)",
    "Nickel as Ni (mg/l)",
    "Chloramines as NH2Cl (mg/l)",
    "Trihalomethane as CHX3 (mg/l)",
    "Pesticides (µg/l)",
    "Alachlor (µg/l)",
    "Atrazine (µg/l)",
    "Aldrin/Dieldrin (µg/l)",
    "Alpha HCH (µg/l)",
    "Beta HCH (µg/l)",
    "Butachlor (µg/l)",
    "Chlorpyriphos (µg/l)",
    "Delta HCH (µg/l)",
    "2,4-Dichlorophenoxyacetic acid (µg/l)",
    "DDT(o,p and p, p-Isomers of DDT,DDE& DDD) (µg/l)",
    "Endosulfan (Alpha, Beta, and sulphate)",
    "Ethion (µg/l)",
    "Gamma-HCH(Lindane) (µg/l)",
    "Isoprotuoron (µg/l)",
    "Malathion (µg/l)",
    "Methyl Parathion(µg/l)",
    "Monocrotophos (µg/l)",
    "Phorate analogues (µg/l)",
    "Alpha Emitter(Bq/L)",
    "Beta Emitter(Bq/L)",
  ]

  const thirdOptions = [
    "Organic Solids (mg/ l)",
    "Inorganic Solids (mg/ l)",
    "Sulfate as So3 (mg/ l)",
    "Chloride as Cl (mg/ l)",
    "Total Suspended Solids (mg/ l)",
    "pH value @ 25oC",
    "To neutralize 100 ml of water using Phenolphthalein indicator (ml)with 0.02N NaoH",
    "To neutralize 100 ml of water Using Methyl Orange indicator(ml)with 0.02 N H2SO4",
  ]

  const fourthOptions = [
    "Total Coliforms",
    "E-Coli",
  ]

  const fifthOptions = [
    "Total microbial count (cfu/ml) a. at 20 -22 C in 72 hours b. At 37 C in 24 hours.",
    "Total yeast and mould count",
    "E.coli",
    "Enterobacteriaceae (Coliforms)",
    "Faecal streptococci",
    "S. aureus",
    "Sulphite reducing anaerobes",
    "Salmonella",
    "Shigella",
    "V. cholera",
    "V. parahaemolyticus",
    "Ps. aeruginosa"
  ]

  const sixthOptions = [
    "Total Bacterial Count",
    "Yeast & Mould",
    "Total Coliform ",
    "E. coli",
    "Staphylococcus aureus",
    "Salmonella Sp",
  ]

  const seventhOptions = [
    "Moisture",
    "Total Ash",
    "Protein",
    "Carbohydrate",
    "Fat",
    "Acid Insoluble Ash",
    "Energy",
    "Crude Fiber"
  ]

  const eighthOptions = [
    "Moisture",
    "Aluminium",
    "Arsenic",
    "Calcium",
    "Chromium",
    "Copper",
    "Iron",
    "Lead",
    "Loss on Ignition",
    "Magnesium",
    "Manganese",
    "Nickel",
    "Oil & Grease",
    "Phosphate",
    "Potassium",
    "Silica",
    "Sodium",
    "Sulphate",
    "Zinc"
  ]

  const ninethOptions = [
    "pH",
    "EC",
    "Moisture",
    "Density",
    "Color",
    "Consistency",
    "Structure",
    "Texture",
    "Loss On Ignition",
    "Lime status ",
    "Alkalinity",
    "Sodium Absorption Ratio",
    "Cation Exchange Ratio",
    "Oil & Grease",
    "Chlorides",
    "Sulphates",
    "Nitrates",
    "Total Nitrogen",
    "Total Phosphorous",
    "Calcium",
    "Magnesium",
    "Sodium",
    "Potassium",
    "Iron",
    "Organic Matter",
    "Water Holding Capacity",
    "Copper",
    "Nickel",
    "Chromium",
    "Lead",
    "Zinc",
  ]

  const tenthOptions =[
    "Density",
    "Viscosity@40oC",
    "Total Acid Number",
    "Water Content",
    "Pour Point",
    "Flash Point",
    "Fire Point",
    "Ash Content",
    "GCV",
    "Sulphur Content"
  ]

  const eleventhOptions = [
    "Moisture",
    "Total Ash",
    "Protein",
    "Carbohydrate",
    "Total Fat",
    "Fibre",
    "Energy",
    "Refractive Index at 40 deg.C",
    "Saponification Value",
    "Iodine Value (Wij’smethod)",
    "Polenske Value",
    "Acid Value",
    "Unsaponifiable Matter",
    "Test for Mineral Oil",
    "Test For Argemone Oil",
    "Test for Castor Oil",
    "Test For Rancidity"
  ]

  const twelfthOptions = [
    "Moisture",
    "Volatile Matter (VM)",
    "Ash",
    "Fixed Carbon",
    "Carbon",
    "Hydrogen",
    "Nitrogen",
    "Sulphur",
    "Oxygen"
  ]

  const thirteenthOptions = [
    "pH at 25OC",
    "Total Suspended Solids (TSS)",
    "Total Dissolved Solids (TDS)",
    "BOD 3 Days at 27° C",
    "COD",
    "Chlorides as Cl",
    "Sulphates as SO4",
    "Oil & Grease"
  ]

  const fourteenthOptions = [
    "pH",
    "Total Suspended Solids (TSS)",
    "Total Dissolved Solids (TDS)",
    "Chemical Oxygen Demand",
    "Bio chemical Oxygen Demand",
    "Total Nitrogen",
    "Total Phosphorus",
    "Oil & Grease"
  ]

  const fifteenthOptions = [
    "Sulphur Dioxide (SO2)",
    "Nitrogen Dioxide (NOx)",
    "Particulate Matter (size less than 10µm)",
    "Particulate Matter (size less than 2.5µm))",
    "Ozone (O3)",
    "Lead (Pb)",
    "Carbon Monoxide (CO)",
    "Ammonia (NH3)",
    "Benzene (C6H6)",
    "Benzo Pyrene ",
    "Arsenic (As)",
    "Nickel (Ni)"
  ]

  const sixteenthOptions = [
    "Flue Gas Temperature",
    "Flue Gas Pressure",
    "Flue Gas Velocity",
    "Volume of Gas Discharged",
    "Particulate Matter (PM)",
    "Sulphur- di- oxide (SO2)",
    "Nitrogen oxides (NOx)",
    "Carbon – di - oxide (CO2)",
    "Carbon Monoxide (CO)",
    "Oxygen (O2)"
  ]

  const seventeenthOptions = [
    "Noise"
  ]

  const eighteenthOptions = [
    "Before Acoustic",
    "After Acoustic",
    "Total Insertion Loss",
  ]

  const nineteenthOptions = [
    "Illumination"
  ]

  const twenteenthOptions = [
    "Air movements (At Workstation within occupied Zone)",
    "Carbon dioxide in (ppm )",
    "Carbon monoxide (ppm)",
    "Oxides of nitrogen concentration -µg/m3",
    "Oxygen in %",
    "Relative Humidity in %",
    "Respirable suspended particulate matter (RSPM) concentration (µg/m3)",
    "Temperature in ˚C",
    "Sulphur- di- oxide (SO2)",
    "Oil Mist"
  ]

  const twentyFirstOptions = [
    "Oxygen Concentration by Volume (dry Air)",
    "Carbon Monoxide as CO",
    "Carbon Di-Oxide as CO2",
    "Water Vapour as H2O",
    "Oil Components",
    "Odor",
    "Dust Concentration (Wet/dry)"
  ]

  const twentySecondOptions=[
    "Silica as SiO2",
    "Alumina as Al2O3",
    "Iron as Fe2O3",
    "Potassium as K2O",
    "Sodium as Na2O",
    "LOI",
    "Calcium as CaO",
    "Magnesium as MgO"
  ]

  const twentyThirdOptions = [
    "Sillica as SIO2",
    "Alumina as Al2O3",
    "Iron as Fe2O3",
    "Calcium as CaO",
    "Magnesium as MgO",
    "Loss On Ignition",
    "Potassium as K2O",
    "Sodium as Na2O",
    "EC"
  ]

  const twentyFourthOptions = [
    "Magnesium as MgCO3",
    "Calcium as CaCO3",
    "Alumina as Al2O3",
    "Iron as Fe2O3",
    "Sodium as Na2O",
    "Potassium as K2O",
    "Silica as SiO2",
    "LOI"
  ]

  const twentyFifthOptions = [
    "Bacterial count - 37°C for 48 hrs",
    "Fungal Count -25°C for 5 Days"
  ]

  const twentySixthOptions = [
    "Bacterial count - 37°C for 48 hrs",
    "Fungal Count -25°C for 5 Days",
    "Total Coliform",
    "E. coli",
    "Staphylococcus aureus"
  ]

  const twentySeventhOptions = [
    "Total Platel count (cfu/ml)",
    "Total Coliform",
    "E.coli",
    "Fecal Coliforms",
    "Faecal streptococci"
  ]

  const twentyEighthOptions =[
    "Micro Metrology",
    "Wind direction",
    "Wind Velocity",
    "Temperature",
    "Relative Humidity"
  ]

  const twentyNinethOptions = [
    "Oxygen Purity ( O2)"
  ]

  
  useEffect(() => {
    if(serviceSelected === "Water: General Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: firstOptions,
      }))}
    else if(serviceSelected === "Water Complete Analysis as per 10500: 2012") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: secondOptions,
      }))}
    else if(serviceSelected === "Water - Construction Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: thirdOptions,
      }))}
    else if(serviceSelected === "Water - Microbiological Analysis") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: fourthOptions,
      }))}
    else if(serviceSelected === "Water –Complete Microbiological Analysis") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: fifthOptions,
      }))}
    else if(serviceSelected === "Food Microbiological Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: sixthOptions,
      }))}
    else if(serviceSelected === "Food Chemical Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: seventhOptions,
      }))}
    else if(serviceSelected === "Sludge Analysis Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: eighthOptions,
      }))}
    else if(serviceSelected === "Soil Testing Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: ninethOptions,
      }))}
    else if(serviceSelected === "Oil - Diesel Testing Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: tenthOptions,
      }))}
    else if(serviceSelected === "Oil - Nutrition Value + FSSAI Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: eleventhOptions,
      }))}
    else if(serviceSelected === "Coal Analysis Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: twelfthOptions,
      }))}
    else if(serviceSelected === "Effluent Water Analysis Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: thirteenthOptions,
      }))}
    else if(serviceSelected === "Sewage Water Chemical Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: fourteenthOptions,
      }))}
    else if(serviceSelected === "Ambient Air Quality Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: fifteenthOptions,
      }))}
    else if(serviceSelected === "DG Stack Emission Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: sixteenthOptions,
      }))}
    else if(serviceSelected === "Ambient Noise Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: seventeenthOptions,
      }))}
    else if(serviceSelected === "DG Noise Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: eighteenthOptions,
      }))}
    else if(serviceSelected === "Lux Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: nineteenthOptions,
      }))}
    else if(serviceSelected === "Indoor Air Quality") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: twenteenthOptions,
      }))}
    else if(serviceSelected === "Compressor Air Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: twentyFirstOptions,
      }))}
    else if(serviceSelected === "Feldspar Analysis Parameter") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: twentySecondOptions,
      }))}
    else if(serviceSelected === "Quartz Sample Analysis Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: twentyThirdOptions,
      }))}
    else if(serviceSelected === "Lime Stone Sample Analysis Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: twentyFourthOptions,
      }))}
    else if(serviceSelected === "Plate - Microbiological Analysis") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: twentyFifthOptions,
      }))}
    else if(serviceSelected === "Swab - Microbiological Analysis") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: twentySixthOptions,
      }))}
    else if(serviceSelected === "Sewage Water Microbiological Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: twentySeventhOptions,
      }))}
    else if(serviceSelected === "Weather Monitoring Parameters") {
      setFormData((prevState) => ({
        ...prevState,
        parameters: twentyEighthOptions,
      }))}
      else if(serviceSelected === "Oxygen Purity Parameters") {
        setFormData((prevState) => ({
          ...prevState,
          parameters: twentyNinethOptions,
        }))}
      console.log(formData.parameters)
  }, [serviceSelected])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChangeService = (value) => {
    setFormData({ ...formData, serviceType: value})
    setServiceSelected(value);
  }

  const handleSelectChangePickup = (value) => {
    setFormData({ ...formData, pickUp: value})
    setPickUp(value);
  }

  const handleSelectChangeDrawn = (value) => {
    setFormData({ ...formData, drawnBy: value})
  }

  const datePicker = (date) => {
    const formattedDate = format(date, "MM/dd/yyyy");
    setFormData({...formData, preferredDate: formattedDate});
  }

  const serviceDatePicker = (date) => {
    const formattedDate = format(date, "MM/dd/yyyy");
    setFormData({...formData, date: formattedDate});
  }

  const handleSelectChangeAllocate = (value) => {
    setFormData({...formData, allottedTo: value});
  }

  const handleCheckboxChange = (e) => {
    let { value, checked } = e.target;
    if (checked) {
      setFormData((prevState) => ({
        ...prevState,
        parameters: [...prevState.parameters, value],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        parameters: prevState.parameters.filter((param) => param !== value),
      }));
    }
  };

  const handleConfirmationChange = (e) => {
    setFormData({ ...formData, confirmation: e.target.checked });
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted: ", formData);

    createEESRecord(formData);
    const inputElement = document.querySelectorAll("input");
    inputElement.forEach((input) => {
      input.value = ""
    })
    // Add logic to send formData to the server or process it further
  };


  return(
    <div className="p-3 w-full h-[500px] overflow-y-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-3">
            <Card>
              <CardHeader></CardHeader>
              <CardContent>
                <FormField 
                  control={form.control}
                  name="fullName"
                  render={() => 
                    <FormItem className="flex items-center gap-3 mb-8">
                      <FormLabel className="lg:text-nowrap font-semibold">Sample Reference Number :</FormLabel>
                      <FormControl>
                        <Input type="text" defaultValue={uniqueId} readOnly/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>} 
                    />    
              </CardContent>
            </Card>

            {/* Customer Details */}  
            <Card>
              <CardHeader className="font-semibold">Customer Details</CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-3">
                  <FormField 
                  control={form.control}
                  name="fullName"
                  render={() => 
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input 
                        name="fullName"
                        onChange={handleInputChange}
                        placeholder="Full Name"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  }
                  />
                  <FormField 
                  control={form.control}
                  name="contactNumber"
                  render={() => 
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input 
                        name="contactNumber"
                        onChange={handleInputChange}
                        placeholder="Enter your Number"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  }
                  />
                  <FormField 
                  control={form.control}
                  name="email"
                  render={() => 
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input 
                        name="email"
                        onChange={handleInputChange}
                        placeholder="Email"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  }
                  />
                  <FormField 
                  control={form.control}
                  name="address"
                  render={() => 
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input 
                        name="address"
                        onChange={handleInputChange}
                        placeholder="Enter your address..." className="flex h-24"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Service Details */}
            <Card>
              <CardHeader className="font-semibold">Service Details</CardHeader>
              <CardContent>
                <FormField 
              control={form.control}
              name="serviceType"
              render={() => 
                <FormItem className="flex mb-3 gap-3 items-center">
                  <FormLabel className="text-nowrap">Service Type</FormLabel>
                  <FormControl>
                    <Select
                    name="serviceType"
                    onValueChange={handleSelectChangeService}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Select">Select</SelectItem>
                        {serviceRequests.map((request, index) => <SelectItem value={request} key={index}>{request}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }
              />
              <FormLabel>Parameters to Test:</FormLabel>
              {serviceSelected == "Water: General Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div>Physical Parameter & </div>
                  <div>Chemical Parameter</div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  firstOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Water Complete Analysis as per 10500: 2012" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div>Physical Parameter & </div>
                  <div>Chemical Parameter</div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  secondOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Water - Construction Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div>Parameter & </div>
                  <div>Neutralization</div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  thirdOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Water - Microbiological Analysis" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div>Parameters </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  fourthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Water –Complete Microbiological Analysis" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div>Parameters </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  fifthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Food Microbiological Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Microbiological Parameter </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  sixthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Food Chemical Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  seventhOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Sludge Analysis Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  eighthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Soil Testing Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div>Physical Parameters & </div>  
                  <div>Chemical Parameters</div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  ninethOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Oil - Diesel Testing Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  tenthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Oil - Nutrition Value + FSSAI Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters & </div>
                  <div> FSSAI Parameters </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  eleventhOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Coal Analysis Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Proximate analysis & Gross Calorific Value(GCV)</div>
                  <div> Ultimate analysis </div>  
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  twelfthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Effluent Water Analysis Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  thirteenthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Sewage Water Chemical Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  fourteenthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Ambient Air Quality Monitoring Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  fifteenthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "DG Stack Emission Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  sixteenthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Ambient Noise Monitoring Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  seventeenthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "DG Noise Monitoring Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  eighteenthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Lux Monitoring Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  nineteenthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Indoor Air Quality" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Physical Parameters & Chemical Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  twenteenthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Compressor Air Monitoring Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  twentyFirstOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Feldspar Analysis Parameter" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  twentySecondOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Quartz Sample Analysis Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  twentyThirdOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Lime Stone Sample Analysis Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  twentyFourthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Plate - Microbiological Analysis" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  twentyFifthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Swab - Microbiological Analysis" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  twentySixthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Sewage Water Microbiological Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  twentySeventhOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Weather Monitoring Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  twentyEighthOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : serviceSelected == "Oxygen Purity Parameters" ? 
              <>
                <div className="flex mt-3 mb-3 gap-3">
                  <div> Parameters </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 items-center">
                {
                  twentyNinethOptions.map( (options, index) => <FormField 
                  control={form.control}
                  name="checkbox"
                  key={index}
                  render={() => 
                    <FormItem className="flex gap-3 items-center">
                      <FormControl>
                        <input type="checkbox" defaultChecked onChange={handleCheckboxChange} value={options}/>    
                      </FormControl>
                      <FormLabel>{options}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  }
                  />) 
                }
                </div>
              </> : ""
              }
              <FormField 
              control={form.control}
              name="dateOfService"
              render={({ field }) => 
                <FormItem className="flex gap-3 items-center mt-3">
                  <FormLabel className="text-nowrap">Preferred Date of Service</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button 
                          variant={"outline"}
                          className={"w-full flex pl-3 text-left font-normal" + !field.value && "text-muted-foreground"}>
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        onDayClick={(e) => datePicker(e)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              }
              />
              <FormField 
              control={form.control}
              name="allotted"
              render={() => 
                <FormItem className="flex gap-3 mt-3 mb-3 items-center">
                  <FormLabel className="text-nowrap">Allotted to</FormLabel>
                  <FormControl>
                    <Select
                    onValueChange={handleSelectChangeAllocate}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select"/>
                      </SelectTrigger>
                      <SelectContent>
                        {
                          serviceSelected == "Water: General Parameters" || 
                          serviceSelected == "Water Complete Analysis as per 10500: 2012" || 
                          serviceSelected == "Water - Construction Parameters" || 
                          serviceSelected == "Food Chemical Parameters" || 
                          serviceSelected == "Sludge Analysis Parameters" || 
                          serviceSelected == "Soil Testing Parameters" || 
                          serviceSelected == "Oil - Diesel Testing Parameters" ||
                          serviceSelected == "Oil - Nutrition Value + FSSAI Parameters" ||
                          serviceSelected == "Coal Analysis Parameters" || 
                          serviceSelected == "Effluent Water Analysis Parameters" || 
                          serviceSelected == "Sewage Water Chemical Parameters" || 
                          serviceSelected == "Feldspar Analysis Parameter" || 
                          serviceSelected == "Quartz Sample Analysis Parameters" || 
                          serviceSelected == "Lime Stone Sample Analysis Parameters" ?
                        <>
                          <SelectItem value="Select">Select</SelectItem>
                          {
                          staffOptions1.map((option, index) =>
                          <SelectItem value={option} key={index}>{option}</SelectItem>)}
                        </> : 
                        serviceSelected == "Water - Microbiological Analysis" ||
                        serviceSelected == "Water –Complete Microbiological Analysis" ||
                        serviceSelected == "Food Microbiological Parameters" ||
                        serviceSelected == "Plate - Microbiological Analysis" || 
                        serviceSelected == "Swab - Microbiological Analysis" ||
                        serviceSelected == "Sewage Water Microbiological Parameters" ? 
                        <>
                          <SelectItem value="Select">Select</SelectItem>
                            {
                            staffOptions2.map((option, index) =>
                            <SelectItem value={option} key={index}>{option}</SelectItem>)}
                        </> : 
                        serviceSelected == "Ambient Air Quality Monitoring Parameters" ||
                        serviceSelected == "DG Stack Emission Parameters" ||
                        serviceSelected == "Ambient Noise Monitoring Parameters" ||
                        serviceSelected == "DG Noise Monitoring Parameters" ||
                        serviceSelected == "Lux Monitoring Parameters" ||
                        serviceSelected == "Indoor Air Quality" ||
                        serviceSelected == "Compressor Air Monitoring Parameters" ||
                        serviceSelected == "Weather Monitoring Parameters" ||
                        serviceSelected == "Oxygen Purity Parameters" ?
                        <>
                          <SelectItem value="Select">Select</SelectItem>
                          {
                          staffOptions3.map((option, index) =>
                            <SelectItem value={option} key={index}>{option}</SelectItem>)}
                        </> : <SelectItem value="Select">Select</SelectItem>}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }
              />
              <FormField 
              control={form.control}
              name="drawnBy"
              render={() => 
                <FormItem className="flex gap-4 items-center">
                  <FormLabel className="lg:text-nowrap"> Drawn By </FormLabel>
                  <FormControl>
                    <Select
                    onValueChange={handleSelectChangeDrawn}>
                      <SelectTrigger>
                        <SelectValue placeholder="EES"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EES">EES</SelectItem>
                        <SelectItem value="Customer">Customer</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              }
              />
              <FormField 
              control={form.control}
              name="serviceDateEntry"
              render={({ field }) => 
                <FormItem className="flex gap-3 items-center mt-3">
                  <FormLabel className="text-nowrap">Entry Service Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button 
                          variant={"outline"}
                          className={"w-full flex pl-3 text-left font-normal" + !field.value && "text-muted-foreground"}>
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Service date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        onDayClick={(e) => serviceDatePicker(e)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              }
              />
              </CardContent>
            </Card>
            
            {/* Logistics Details */}

            <Card>
              <CardHeader className="font-semibold">Pickup Details</CardHeader>
              <CardContent>
                <FormField 
              control={form.control}
              name="pickup"
              render={() => 
                <FormItem className="flex gap-3 items-center mb-3">
                  <FormLabel className="text-nowrap">Pickup required?</FormLabel>
                  <FormControl>
                    <Select onValueChange={handleSelectChangePickup}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }
              />
              { pickUp === "Yes" ?
                <FormField 
                control={form.control}
                name="pickupAddress"
                render={() => 
                  <FormItem className="flex gap-3 items-center mb-3">
                    <FormLabel className="text-nowrap">Pickup Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter pickup address.." className="h-24"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }
                />
              : pickUp === "No" ? 
              <FormField 
              control={form.control}
              name="dropOffAddress"
              render={() => 
                <FormItem className="flex gap-3 items-center mb-3">
                  <FormLabel className="text-nowrap">Drop-off Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter drop-off address.." className="h-24"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }
              /> : "" }
                <FormField 
                  control={form.control}
                  name="pickupDate"
                  render={({ field }) => 
                  <FormItem className="flex gap-3 items-center mb-3">
                    <FormLabel className="text-nowrap">Pickup/Drop-Off Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button 
                              variant={"outline"}
                              className={"w-full flex pl-3 text-left font-normal" + !field.value && "text-muted-foreground"}>
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pickup date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }
                />

              </CardContent>
            </Card>
            
            <Card>
              <CardHeader></CardHeader>
              <CardContent>
                <FormField 
                control={form.control}
                name="remarks"
                render={() => 
                  <FormItem className="flex gap-3 mb-3 items-start">
                    <FormLabel className="text-nowrap pt-3">Remarks or Special Request</FormLabel>
                    <FormControl>
                      <Input 
                      name="remarks"
                      onChange={handleInputChange}
                      placeholder="type here.." className="h-24"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }
                />
              </CardContent>
            </Card>
          </div>

          {/* Confirmation */}
          <FormField 
          control={form.control}
          name="confirmation"
          render={() => 
            <FormItem className="flex gap-3 items-center mb-3">
              <FormControl>
                 <input type="checkbox" onChange={handleConfirmationChange} />    
              </FormControl>
              <FormLabel>I confirm the details are accurate and agree to the pricing terms.</FormLabel>
              <FormMessage />
            </FormItem>
          }
          />

          {/* Submit */}
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
          <Button variant="outline" type="reset">Reset</Button>
        </form>
      </Form>
    </div>
  )
}






export async function createEESRecord(requestData) {
  const apiUrl = "https://0znzn1z8z4.execute-api.ap-south-1.amazonaws.com/Dev/EES_Create_Record";
  requestData["Type"] = "Ticket";
  requestData["TicketID"] = "Ticket12354545";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Response:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export default ServiceRequestForm