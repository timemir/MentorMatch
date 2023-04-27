import { FooterComponent } from "flowbite-react";
import { FooterBrand } from "flowbite-react/lib/esm/components/Footer/FooterBrand";
import { FooterCopyright } from "flowbite-react/lib/esm/components/Footer/FooterCopyright";
import { FooterDivider } from "flowbite-react/lib/esm/components/Footer/FooterDivider";
import { FooterIcon } from "flowbite-react/lib/esm/components/Footer/FooterIcon";
import { FooterLink } from "flowbite-react/lib/esm/components/Footer/FooterLink";
import { FooterLinkGroup } from "flowbite-react/lib/esm/components/Footer/FooterLinkGroup";
import { FooterTitle } from "flowbite-react/lib/esm/components/Footer/FooterTitle";
import { BsGithub } from "react-icons/bs";
import logoTree from "../../assets/logo/logoTree.png";

export default function Footer() {
  return (
    <FooterComponent className="bg-mentorPrimary" container>
      <div className="w-full ">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="text-white">
            <FooterBrand
              href="/"
              src={logoTree}
              alt="MentorMatch Logo"
              name="MentorMatch"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="about" />
              <FooterLinkGroup col>
                <FooterLink href="#">MentorMatch</FooterLink>
                <FooterLink href="#">Team</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Follow us" />
              <FooterLinkGroup col>
                <FooterLink href="https://github.com/TechLabs-Dortmund/mentor-matching">
                  Github
                </FooterLink>
                <FooterLink href="https://techlabs.org/location/dortmund">
                  TechLabs
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Legal" />
              <FooterLinkGroup col>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms & Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by="MentorMatch™" year={2023} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon
              href="https://github.com/TechLabs-Dortmund/mentor-matching"
              icon={BsGithub}
            />
          </div>
        </div>
      </div>
    </FooterComponent>
  );
}
