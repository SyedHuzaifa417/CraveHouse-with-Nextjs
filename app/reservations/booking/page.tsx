"use client";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface BookingDetails {
  date: Date;
  time: string;
  people: number;
  looking: string;
  firstName: string;
  lastName: string;
  companyName: string;
  mobile: string;
  email: string;
  specialRequirements: string[];
}

const BookingProcess: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    date: new Date(),
    time: "",
    people: 2,
    looking: "",
    firstName: "",
    lastName: "",
    companyName: "",
    mobile: "",
    email: "",
    specialRequirements: [],
  });
  const router = useRouter();

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields.", {
        position: "bottom-right",
      });
      return;
    }

    try {
      const response = await axios.post("/api/reservation", bookingDetails);
      toast.success("The reservation has been made", {
        position: "bottom-right",
      });
      setBookingDetails({
        date: new Date(),
        time: "",
        people: 2,
        looking: "",
        firstName: "",
        lastName: "",
        companyName: "",
        mobile: "",
        email: "",
        specialRequirements: [],
      });

      router.push("/");
    } catch (error) {
      toast.error("Failed to make reservation. Please try again.", {
        position: "bottom-right",
      });
    }
  };

  const validateForm = (): boolean => {
    if (step === 0) {
      return (
        bookingDetails.date !== null &&
        bookingDetails.time !== "" &&
        bookingDetails.looking !== ""
      );
    } else if (step === 1) {
      const requiredFields: (keyof BookingDetails)[] = [
        "firstName",
        "lastName",
        "mobile",
        "email",
      ];
      return requiredFields.every((field) => bookingDetails[field] !== "");
    }
    return true;
  };

  const nextStep = () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields.", {
        position: "bottom-right",
      });
      return;
    }
    setStep(step + 1);
  };
  const prevStep = () => setStep(step - 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const timeSlots: string[] = [
    "7:00 AM",
    "11:30 AM",
    "2:00 PM",
    "4:30 PM",
    "6:00 PM",
    "7:30 PM",
    "9:00 PM",
    "10:30 PM",
    "11:00 PM",
  ];

  const renderStep0 = () => (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-food_yellow mb-4">
        Make Reservation
      </h2>
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center">
        <Calendar
          mode="single"
          selected={bookingDetails.date}
          onSelect={(date: Date | undefined) =>
            date && setBookingDetails((prev) => ({ ...prev, date }))
          }
          className="rounded-md border bg-orange-200 outline outline-orange-600 w-max  text-gray-700"
        />
        <div className="w-full md:w-1/2">
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-h1Text">
                Booking for {bookingDetails.people} people
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex justify-between items-center text-gray-300">
                  <span>Number of people:</span>
                  <div>
                    <Button
                      onClick={() =>
                        setBookingDetails((prev) => ({
                          ...prev,
                          people: Math.max(1, prev.people - 1),
                        }))
                      }
                      variant="outline"
                      size="default"
                      className="text-orange-100 border-gray-600"
                    >
                      −
                    </Button>
                    <span className="mx-2 text-orange-400 text-xl">
                      {bookingDetails.people}
                    </span>
                    <Button
                      onClick={() =>
                        setBookingDetails((prev) => ({
                          ...prev,
                          people: prev.people + 1,
                        }))
                      }
                      variant="outline"
                      size="default"
                      className="text-orange-100 border-gray-600"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-h1Text">
                What are you looking for
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  value={bookingDetails.looking}
                  onValueChange={(value: string) =>
                    setBookingDetails((prev) => ({ ...prev, looking: value }))
                  }
                >
                  <div className="flex space-x-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Lunch" id="lunch" />
                      <Label htmlFor="lunch" className="text-pText">
                        Lunch
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Breakfast" id="breakfast" />
                      <Label htmlFor="breakfast" className="text-pText">
                        Breakfast
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Dinner" id="dinner" />
                      <Label htmlFor="dinner" className="text-pText">
                        Dinner
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-h1Text">
                Select a time
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      onClick={() =>
                        setBookingDetails((prev) => ({ ...prev, time: slot }))
                      }
                      variant={
                        bookingDetails.time === slot ? "default" : "outline"
                      }
                      size="sm"
                      className={
                        bookingDetails.time === slot
                          ? "bg-orange-600 text-white"
                          : "text-orange-100 border-orange-100"
                      }
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-food_yellow">
          Customer Details
        </h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="firstName" className="text-pText">
              First Name *
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={bookingDetails.firstName}
              onChange={handleInputChange}
              className="border-none bg-slate-600 text-pText"
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-pText">
              Last Name *
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={bookingDetails.lastName}
              onChange={handleInputChange}
              className="border-none bg-slate-600 text-pText"
              required
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="mobile" className="text-pText">
                Mobile *
              </Label>
              <Input
                type="tel"
                name="mobile"
                value={bookingDetails.mobile}
                onChange={handleInputChange}
                className="border-none bg-slate-600 text-pText"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email" className="text-pText">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={bookingDetails.email}
              onChange={handleInputChange}
              className="border-none bg-slate-600 text-pText"
              required
            />
          </div>
          <div>
            <Label htmlFor="companyName" className="text-pText">
              Company Name
            </Label>
            <Input
              id="companyName"
              name="companyName"
              value={bookingDetails.companyName}
              onChange={handleInputChange}
              className="border-none bg-slate-600 text-pText"
            />
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-food_yellow">
          Special Requirements
        </h2>
        <div className="space-y-2">
          {[
            "Birthday",
            "Anniversary",
            "Wheelchair Accessibility",
            "Allergy",
            "Highchair",
            "Pram",
            "Dietary Requirements",
            "Corporate Function",
            "Children",
            "Engagement",
          ].map((item: any) => (
            <div key={item} className="flex items-center">
              <Checkbox
                id={item.toLowerCase().replace(" ", "-")}
                checked={bookingDetails.specialRequirements.includes(item)}
                onCheckedChange={(checked: boolean) => {
                  if (checked) {
                    setBookingDetails((prev) => ({
                      ...prev,
                      specialRequirements: [...prev.specialRequirements, item],
                    }));
                  } else {
                    setBookingDetails((prev) => ({
                      ...prev,
                      specialRequirements: prev.specialRequirements.filter(
                        (req) => req !== item
                      ),
                    }));
                  }
                }}
                className="border-pText"
              />
              <label
                htmlFor={item.toLowerCase().replace(" ", "-")}
                className="ml-2 text-pText"
              >
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-food_yellow">
        Confirm your details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400">
        <div>
          <h3 className="font-semibold text-pText">First Name</h3>
          <p>{bookingDetails.firstName}</p>
        </div>
        <div>
          <h3 className="font-semibold text-pText">Surname</h3>
          <p>{bookingDetails.lastName}</p>
        </div>
        <div>
          <h3 className="font-semibold text-pText">Company Name</h3>
          <p>{bookingDetails.companyName || "N/A"}</p>
        </div>
        <div>
          <h3 className="font-semibold text-pText">Mobile</h3>
          <p>{bookingDetails.mobile}</p>
        </div>
        <div>
          <h3 className="font-semibold text-pText">Email</h3>
          <p>{bookingDetails.email}</p>
        </div>
        <div>
          <h3 className="font-semibold text-pText">Date</h3>
          <p>{bookingDetails.date.toDateString()}</p>
        </div>
        <div>
          <h3 className="font-semibold text-pText">For</h3>
          <p>{bookingDetails.people} people</p>
        </div>
        <div>
          <h3 className="font-semibold text-pText">At</h3>
          <p>{bookingDetails.time}</p>
        </div>
        <div>
          <h3 className="font-semibold text-pText">Looking for</h3>
          <p>{bookingDetails.looking}</p>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-pText">Special Requirements</h3>
        <div className="mt-2">
          {bookingDetails.specialRequirements.length > 0 ? (
            bookingDetails.specialRequirements.map((req, index) => (
              <span
                key={index}
                className="inline-block bg-food_red text-orange-100 px-2 py-1 rounded mr-2 mb-2"
              >
                {req}
              </span>
            ))
          ) : (
            <p className="text-gray-400">None</p>
          )}
        </div>
      </div>
    </div>
  );
  return (
    <div className="flex flex-col gap-8 mx-auto my-8 w-full max-w-4xl">
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
            height: 64,
            width: 354,
          },
        }}
      />
      <div className="flex justify-between mb-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-1/3 h-2 ${i <= step ? "bg-food_red" : "bg-gray-500"}`}
          />
        ))}
      </div>

      {step === 0 && renderStep0()}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}

      <div className="mt-8 flex justify-between">
        {step > 0 && (
          <Button
            onClick={prevStep}
            className="mx-auto bg-orange-600 text-white"
          >
            BACK
          </Button>
        )}
        {step < 2 ? (
          <Button
            onClick={nextStep}
            className="mx-auto bg-orange-600 text-white"
          >
            NEXT
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="mx-auto bg-orange-600 text-white"
          >
            BOOK NOW
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingProcess;
